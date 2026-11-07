#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$APP_DIR/dist"
PORT="${AMORCALC_PORT:-8080}"
APP_URL="http://127.0.0.1:$PORT"
LOG_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/amorcalc"
LOG_FILE="$LOG_DIR/server.log"

if [[ ! -f "$DIST_DIR/index.html" ]]; then
  printf 'O AmorCalc ainda não foi compilado. Na pasta do projeto, execute:\n  npm install && npm run build\n' >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  printf 'Não encontrei o Python 3, necessário para abrir o AmorCalc localmente.\n' >&2
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  printf 'Não encontrei o curl, necessário para verificar o servidor local do AmorCalc.\n' >&2
  exit 1
fi

if ! command -v xdg-open >/dev/null 2>&1; then
  printf 'Não encontrei o xdg-open, necessário para abrir o navegador.\n' >&2
  exit 1
fi

response="$(curl --silent --show-error --max-time 1 --write-out $'\n%{http_code}' "$APP_URL/" 2>/dev/null || true)"
status="${response##*$'\n'}"
page="${response%$'\n'*}"

if [[ "$status" =~ ^[1-5][0-9][0-9]$ ]]; then
  if [[ "$page" != *'<title>AmorCalc'* ]]; then
    printf 'A porta %s já está sendo usada por outro aplicativo. Feche-o ou tente: AMORCALC_PORT=8081 %s\n' "$PORT" "$0" >&2
    exit 1
  fi
else
  mkdir -p "$LOG_DIR"
  python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$DIST_DIR" </dev/null >"$LOG_FILE" 2>&1 &
  server_pid=$!
  ready=false

  for _ in {1..30}; do
    if ! kill -0 "$server_pid" 2>/dev/null; then
      printf 'Não foi possível iniciar o servidor local do AmorCalc. Detalhes:\n' >&2
      cat "$LOG_FILE" >&2
      exit 1
    fi

    response="$(curl --silent --show-error --max-time 1 --write-out $'\n%{http_code}' "$APP_URL/" 2>/dev/null || true)"
    status="${response##*$'\n'}"
    page="${response%$'\n'*}"
    if [[ "$status" == "200" && "$page" == *'<title>AmorCalc'* ]]; then
      ready=true
      break
    fi
    sleep 0.2
  done

  if [[ "$ready" != true ]]; then
    kill "$server_pid" 2>/dev/null || true
    printf 'O servidor do AmorCalc não respondeu em %s. Verifique %s.\n' "$APP_URL" "$LOG_FILE" >&2
    exit 1
  fi
fi

xdg-open "$APP_URL"
