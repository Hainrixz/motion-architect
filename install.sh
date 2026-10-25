#!/usr/bin/env bash
# Copyright (c) 2026 Enrique Rocha (@soyenriquerocha)
# SPDX-License-Identifier: MIT
# id: er-22575577
# Motion Architect — instalador de un comando. Todo corre local.
#   ./install.sh            instala todo (pregunta antes de usar brew)
#   ./install.sh --yes      sin preguntas
#   ./install.sh --no-skills  solo dependencias y estudio de Remotion
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STUDIO_DIR="$REPO_DIR/studio"
YES=0
SKILLS=1
for arg in "$@"; do
  case "$arg" in
    --yes|-y) YES=1 ;;
    --no-skills) SKILLS=0 ;;
    -h|--help) sed -n 2,5p "$0"; exit 0 ;;
  esac
done

c_coral=$'\033[38;5;209m'; c_dim=$'\033[2m'; c_ok=$'\033[32m'; c_warn=$'\033[33m'; c_err=$'\033[31m'; c_off=$'\033[0m'
say()  { printf "%s▸%s %s\n" "$c_coral" "$c_off" "$*"; }
ok()   { printf "  %s✓%s %s\n" "$c_ok" "$c_off" "$*"; }
warn() { printf "  %s!%s %s\n" "$c_warn" "$c_off" "$*"; }
fail() { printf "  %s✗%s %s\n" "$c_err" "$c_off" "$*"; }
has()  { command -v "$1" >/dev/null 2>&1; }
confirm() {
  [ "$YES" = 1 ] && return 0
  read -r -p "  $1 [s/N] " r || true
  [[ "$r" =~ ^[sSyY]$ ]]
}

printf "\n%s  ◆ Motion Architect%s  %smotion graphics con Claude + Remotion, todo local%s\n\n" "$c_coral" "$c_off" "$c_dim" "$c_off"

# ── 1. Dependencias del sistema ────────────────────────────────────────────
say "Revisando dependencias del sistema"
MISSING=()
if has node; then
  NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
  if [ "$NODE_MAJOR" -ge 18 ]; then ok "node $(node -v)"; else fail "node $(node -v) — se necesita 18 o más"; MISSING+=(node); fi
else fail "node no encontrado"; MISSING+=(node); fi
for bin in ffmpeg yt-dlp python3; do
  if has "$bin"; then ok "$bin"; else fail "$bin no encontrado"; MISSING+=("$bin"); fi
done

if [ "${#MISSING[@]}" -gt 0 ]; then
  if has brew; then
    PKGS=()
    for m in "${MISSING[@]}"; do case "$m" in python3) PKGS+=(python) ;; *) PKGS+=("$m") ;; esac; done
    if confirm "¿Instalo con Homebrew: ${PKGS[*]}?"; then
      brew install "${PKGS[@]}"
    else
      fail "Faltan: ${MISSING[*]}. Instálalos y vuelve a correr ./install.sh"; exit 1
    fi
  else
    fail "Faltan: ${MISSING[*]}."
    echo "    macOS: instala Homebrew (https://brew.sh) y vuelve a correr."
    echo "    Linux: sudo apt install nodejs npm ffmpeg python3 && pipx install yt-dlp"
    exit 1
  fi
fi

# ── 2. Estudio de Remotion ─────────────────────────────────────────────────
say "Preparando el estudio de animación"
( cd "$STUDIO_DIR" && npm install --no-fund --no-audit --loglevel=error )
ok "estudio listo"
( cd "$STUDIO_DIR" && npx tsc --noEmit ) && ok "TypeScript compila"

# ── 3. Agente en Claude Code ───────────────────────────────────────────────
if [ "$SKILLS" = 1 ]; then
  if ! has claude; then
    warn "No encontré el CLI 'claude'. Instala Claude Code (https://claude.com/claude-code) y vuelve a correr."
    warn "Mientras tanto, el estudio ya funciona: cd studio && npm run studio"
  else
    say "Instalando el agente Motion Architect"
    if ! claude plugin marketplace list 2>/dev/null | grep -qE "(❯ |^)motion-architect$"; then
      claude plugin marketplace add "$REPO_DIR" >/dev/null 2>&1 || true
    else
      claude plugin marketplace update motion-architect >/dev/null 2>&1 || true
    fi
    if claude plugin list 2>/dev/null | grep -q "motion-architect@motion-architect"; then
      claude plugin update motion-architect@motion-architect >/dev/null 2>&1 || true
      ok "agente al día"
    elif claude plugin install motion-architect@motion-architect >/dev/null 2>&1; then
      ok "agente instalado (/motion)"
    else
      fail "no se pudo instalar el agente. Dentro de Claude Code: /plugin marketplace add $REPO_DIR"
    fi
    python3 "$REPO_DIR/skills/motion-architect/engine/vision/setup.py" --check >/dev/null 2>&1 \
      && ok "motor de visión listo" || warn "motor de visión: revisa que ffmpeg y yt-dlp estén instalados"
    python3 "$REPO_DIR/skills/motion-architect/engine/design/scripts/search.py" "minimal" --domain color -n 1 >/dev/null 2>&1 \
      && ok "motor de diseño listo" || warn "motor de diseño: revisa python3"
  fi
fi

# ── 4. Ubicación del estudio ───────────────────────────────────────────────
# El agente busca studio/ en el directorio actual, en $MOTION_ARCHITECT_HOME o en ~/motion-architect.
if [ "$REPO_DIR" != "$HOME/motion-architect" ] && [ ! -e "$HOME/motion-architect" ]; then
  ln -s "$REPO_DIR" "$HOME/motion-architect"
  ok "atajo creado: ~/motion-architect → $REPO_DIR"
fi

# ── 5. Transcripción (opcional) ─────────────────────────────────────────────
ENV_FILE="$HOME/.config/motion-architect/.env"
if [ -f "$ENV_FILE" ] && grep -qE '^(GROQ|OPENAI)_API_KEY=.+' "$ENV_FILE"; then
  ok "transcripción de videos activada"
else
  printf "  %s·%s Opcional: para transcribir videos sin subtítulos, agrega GROQ_API_KEY u OPENAI_API_KEY en %s\n" "$c_dim" "$c_off" "$ENV_FILE"
fi

printf "\n%s  ◆ Listo.%s\n\n" "$c_coral" "$c_off"
cat <<EOF
  1. Reinicia Claude Code para que cargue los plugins nuevos.
  2. Abre Claude Code en esta carpeta:   cd "$REPO_DIR" && claude
  3. Pídele algo:   /motion un reel vertical de 15 s anunciando mi app, estilo cinematic
  4. Preview en vivo: cd studio && npm run studio   →  http://localhost:3000

EOF
