#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$APP_DIR/dist"

if [[ ! -f "$DIST_DIR/index.html" ]]; then
  printf 'O AmorCalc ainda não foi compilado. Na pasta do projeto, execute:\n  npm install && npm run build\n' >&2
  exit 1
fi

if [[ ! -x "$APP_DIR/node_modules/.bin/electron" ]]; then
  printf 'O Electron não está instalado neste projeto. Execute na pasta do AmorCalc:\n  npm install\n' >&2
  exit 1
fi

cd "$APP_DIR"
exec "$APP_DIR/node_modules/.bin/electron" "$APP_DIR"
