#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
LAUNCHER="$APP_DIR/start-amorcalc.sh"
ICON="$APP_DIR/amorcalc-icon.svg"
APPLICATIONS_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
DESKTOP_FILE="$APPLICATIONS_DIR/amorcalc.desktop"

if [[ ! -f "$APP_DIR/dist/index.html" ]]; then
  printf 'Compile o AmorCalc antes de instalar o atalho:\n  npm install && npm run build\n' >&2
  exit 1
fi

if [[ ! -x "$APP_DIR/node_modules/.bin/electron" ]]; then
  printf 'Instale o Electron antes de criar o atalho:\n  npm install\n' >&2
  exit 1
fi

if ! command -v desktop-file-validate >/dev/null 2>&1; then
  printf 'Não encontrei desktop-file-validate. Instale as ferramentas de validação de arquivos .desktop e tente novamente.\n' >&2
  exit 1
fi

mkdir -p "$APPLICATIONS_DIR"
chmod +x "$LAUNCHER"

cat >"$DESKTOP_FILE" <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=AmorCalc
GenericName=Calculadora científica
Comment=Calculadora científica para cálculos, gráficos e estatística
Exec="$LAUNCHER"
Icon=$ICON
Path=$APP_DIR
Terminal=false
Categories=Education;
StartupNotify=true
EOF

desktop-file-validate "$DESKTOP_FILE"
printf 'Atalho instalado no menu de aplicativos: %s\n' "$DESKTOP_FILE"
