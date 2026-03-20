#!/usr/bin/env bash
set -euo pipefail

# Build and push all NocoBuilder Docker images to Docker Hub
# Usage: ./docker-build-push.sh [--no-push]

PUSH=true
if [[ "${1:-}" == "--no-push" ]]; then
  PUSH=false
fi

IMAGES=(
  "docker/app.Dockerfile|.|agentnxxt/nocobuilder"
  "docker/realtime.Dockerfile|.|agentnxxt/nocobuilder-realtime"
  "docker/db.Dockerfile|.|agentnxxt/nocobuilder-migrations"
  "mcp-servers/ghost-mcp-server/Dockerfile|mcp-servers/ghost-mcp-server|agentnxxt/ghost-mcp-server"
  "mcp-servers/hostinger-mcp/Dockerfile|mcp-servers/hostinger-mcp|agentnxxt/hostinger-mcp"
  "mcp-servers/logto-mcp-server/Dockerfile|mcp-servers/logto-mcp-server|agentnxxt/logto-mcp-server"
)

for entry in "${IMAGES[@]}"; do
  IFS='|' read -r dockerfile context image <<< "$entry"
  echo "Building ${image}:latest from ${dockerfile}..."
  docker build -f "$dockerfile" -t "${image}:latest" "$context"
done

if [[ "$PUSH" == "true" ]]; then
  echo ""
  echo "Pushing images to Docker Hub..."
  for entry in "${IMAGES[@]}"; do
    IFS='|' read -r _ _ image <<< "$entry"
    echo "Pushing ${image}:latest..."
    docker push "${image}:latest"
  done
  echo "All images pushed successfully."
else
  echo "Build complete. Skipped push (--no-push)."
fi
