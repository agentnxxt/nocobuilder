# ========================================
# Base Stage: Debian-based Bun with Node.js 22
# ========================================
FROM oven/bun:1.3.10-slim AS base

# Install Node.js 22 and common dependencies once in base stage
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip python3-venv make g++ curl ca-certificates bash ffmpeg \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# ========================================
# Dependencies Stage: Install Dependencies
# ========================================
FROM base AS deps
WORKDIR /app

COPY package.json bun.lock turbo.json ./
RUN mkdir -p apps packages/db packages/testing packages/logger packages/tsconfig
COPY apps/nocobuilder/package.json ./apps/nocobuilder/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/testing/package.json ./packages/testing/package.json
COPY packages/logger/package.json ./packages/logger/package.json
COPY packages/tsconfig/package.json ./packages/tsconfig/package.json

# Install turbo globally, then dependencies, then rebuild isolated-vm for Node.js
# Use --linker=hoisted for flat node_modules layout (required for Docker multi-stage builds)
RUN --mount=type=cache,id=bun-cache,target=/root/.bun/install/cache \
    --mount=type=cache,id=npm-cache,target=/root/.npm \
    bun install -g turbo && \
    HUSKY=0 bun install --omit=dev --ignore-scripts --linker=hoisted && \
    cd node_modules/isolated-vm && npx node-gyp rebuild --release

# ========================================
# Builder Stage: Build the Application
# ========================================
FROM base AS builder
WORKDIR /app

# Install turbo globally (cached for fast reinstall)
RUN --mount=type=cache,id=bun-cache,target=/root/.bun/install/cache \
    bun install -g turbo

# Copy node_modules from deps stage (cached if dependencies don't change)
COPY --from=deps /app/node_modules ./node_modules

# Copy package configuration files (needed for build)
COPY package.json bun.lock turbo.json ./
COPY apps/nocobuilder/package.json ./apps/nocobuilder/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/testing/package.json ./packages/testing/package.json
COPY packages/logger/package.json ./packages/logger/package.json

# Copy workspace configuration files (needed for turbo)
COPY apps/nocobuilder/next.config.ts ./apps/nocobuilder/next.config.ts
COPY apps/nocobuilder/tsconfig.json ./apps/nocobuilder/tsconfig.json
COPY apps/nocobuilder/tailwind.config.ts ./apps/nocobuilder/tailwind.config.ts
COPY apps/nocobuilder/postcss.config.mjs ./apps/nocobuilder/postcss.config.mjs

# Copy source code (changes most frequently - placed last to maximize cache hits)
COPY apps/nocobuilder ./apps/nocobuilder
COPY packages ./packages

# Required for standalone nextjs build
WORKDIR /app/apps/nocobuilder
RUN --mount=type=cache,id=bun-cache,target=/root/.bun/install/cache \
    HUSKY=0 bun install sharp --linker=hoisted

ENV NEXT_TELEMETRY_DISABLED=1 \
    VERCEL_TELEMETRY_DISABLED=1 \
    DOCKER_BUILD=1

WORKDIR /app

# Provide dummy database URLs during image build so server code that imports @nocobuilder/db
# can be evaluated without crashing. Runtime environments should override these.
ARG DATABASE_URL="postgresql://user:pass@localhost:5432/dummy"
ENV DATABASE_URL=${DATABASE_URL}

# Provide dummy NEXT_PUBLIC_APP_URL for build-time evaluation
# Runtime environments should override this with the actual URL
ARG NEXT_PUBLIC_APP_URL="http://localhost:3000"
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

RUN bun run build

# ========================================
# Runner Stage: Run the actual app
# ========================================

FROM base AS runner
WORKDIR /app

# Node.js 22, Python, ffmpeg, etc. are already installed in base stage
ENV NODE_ENV=production

# Create non-root user and group
RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs nextjs

# Copy application artifacts from builder
COPY --from=builder --chown=nextjs:nodejs /app/apps/nocobuilder/public ./apps/nocobuilder/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/nocobuilder/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/nocobuilder/.next/static ./apps/nocobuilder/.next/static

# Copy isolated-vm native module (compiled for Node.js in deps stage)
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/isolated-vm ./node_modules/isolated-vm

# Copy the isolated-vm worker script
COPY --from=builder --chown=nextjs:nodejs /app/apps/nocobuilder/lib/execution/isolated-vm-worker.cjs ./apps/nocobuilder/lib/execution/isolated-vm-worker.cjs

# Guardrails setup with pip caching
COPY --from=builder --chown=nextjs:nodejs /app/apps/nocobuilder/lib/guardrails/requirements.txt ./apps/nocobuilder/lib/guardrails/requirements.txt
COPY --from=builder --chown=nextjs:nodejs /app/apps/nocobuilder/lib/guardrails/validate_pii.py ./apps/nocobuilder/lib/guardrails/validate_pii.py

# Install Python dependencies with pip cache mount for faster rebuilds
RUN --mount=type=cache,target=/root/.cache/pip \
    python3 -m venv ./apps/nocobuilder/lib/guardrails/venv && \
    ./apps/nocobuilder/lib/guardrails/venv/bin/pip install --upgrade pip && \
    ./apps/nocobuilder/lib/guardrails/venv/bin/pip install -r ./apps/nocobuilder/lib/guardrails/requirements.txt && \
    chown -R nextjs:nodejs /app/apps/nocobuilder/lib/guardrails

# Create .next/cache directory with correct ownership
RUN mkdir -p apps/nocobuilder/.next/cache && \
    chown -R nextjs:nodejs apps/nocobuilder/.next/cache

# Switch to non-root user
USER nextjs

EXPOSE 3000
ENV PORT=3000 \
    HOSTNAME="0.0.0.0"

CMD ["bun", "apps/nocobuilder/server.js"]