#!/bin/bash
# Sim Project Commands
# Source this file to add project-specific commands to your shell
# Add to your ~/.bashrc or ~/.zshrc: source /workspace/.devcontainer/noco-commands.sh

# Project-specific aliases for Sim development
alias noco-start="cd /workspace && bun run dev:full"
alias noco-app="cd /workspace && bun run dev"
alias noco-sockets="cd /workspace && bun run dev:sockets"
alias noco-migrate="cd /workspace/apps/nocobuilder && bunx drizzle-kit push"
alias noco-generate="cd /workspace/apps/nocobuilder && bunx drizzle-kit generate"
alias noco-rebuild="cd /workspace && bun run build && bun run start"
alias docs-dev="cd /workspace/apps/docs && bun run dev"

# Database connection helpers
alias pgc="PGPASSWORD=postgres psql -h db -U postgres -d nocobuilder"
alias check-db="PGPASSWORD=postgres psql -h db -U postgres -c '\l'"

# Default to workspace directory
cd /workspace 2>/dev/null || true

# Welcome message - show once per session
if [ -z "$SIM_WELCOME_SHOWN" ]; then
  export SIM_WELCOME_SHOWN=1

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🚀 Sim Development Environment"
  echo ""
  echo "Project commands:"
  echo "  noco-start      - Start app + socket server"
  echo "  noco-app        - Start only main app"
  echo "  noco-sockets    - Start only socket server"
  echo "  noco-migrate    - Push schema changes"
  echo "  noco-generate   - Generate migrations"
  echo ""
  echo "Database:"
  echo "  pgc            - Connect to PostgreSQL"
  echo "  check-db       - List databases"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
fi
