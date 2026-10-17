#!/usr/bin/env bash
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
say "Instalando el estudio de Remotion (studio/)"
( cd "$STUDIO_DIR" && npm install --no-fund --no-audit --loglevel=error )
ok "dependencias de npm listas"
( cd "$STUDIO_DIR" && npx tsc --noEmit ) && ok "TypeScript compila"

# ── 3. Skills y plugins de Claude Code ─────────────────────────────────────
if [ "$SKILLS" = 1 ]; then
  if ! has claude; then
    warn "No encontré el CLI 'claude'. Instala Claude Code (https://claude.com/claude-code) y vuelve a correr."
    warn "Mientras tanto, el estudio ya funciona: cd studio && npm run studio"
  else
    say "Instalando skills de diseño y animación"
    MARKETS="$(claude plugin marketplace list 2>/dev/null || true)"
    PLUGINS="$(claude plugin list 2>/dev/null || true)"

    add_plugin() { # $1 fuente  $2 nombre-marketplace  $3 plugin  $4 etiqueta
      if ! grep -qE "(❯ |^)$2\$" <<<"$MARKETS"; then
        claude plugin marketplace add "$1" >/dev/null 2>&1 || true
        MARKETS="$MARKETS"$'\n'"$2"
      fi
      if grep -q "$3@$2" <<<"$PLUGINS"; then
        ok "$4 (ya estaba)"
      elif claude plugin install "$3@$2" >/dev/null 2>&1; then
        ok "$4"
      else
        warn "$4: no se pudo instalar. Dentro de Claude Code: /plugin install $3@$2"
      fi
    }

    add_plugin "$REPO_DIR"                       motion-architect     motion-architect  "Motion Architect (agente + /motion)"
    add_plugin latent-spaces/brag                brag                 brag              "Brag (método de video de lanzamiento)"
    add_plugin nextlevelbuilder/ui-ux-pro-max-skill ui-ux-pro-max-skill ui-ux-pro-max   "UI/UX Pro Max (estilo, paleta, tipografía)"
    add_plugin bradautomates/claude-video        claude-video         watch             "watch (Claude ve videos)"

    if npx -y skills@latest add emilkowalski/skills -g -y -a claude-code \
         --skill emil-design-eng review-animations animate animation-vocabulary improve-animations >/dev/null 2>&1; then
      ok "Emil Kowalski (emil-design-eng, review-animations, animate…)"
    else
      warn "Emil Kowalski: corre a mano → npx skills add emilkowalski/skills"
    fi
    if npx -y skills@latest add remotion-dev/skills -g -y -a claude-code --skill '*' >/dev/null 2>&1; then
      ok "Remotion Agent Skills (remotion-best-practices…)"
    else
      warn "Remotion skills: corre a mano → npx skills add remotion-dev/skills"
    fi
  fi
fi

# ── 4. Ubicación del estudio ───────────────────────────────────────────────
# El agente busca studio/ en el directorio actual, en $MOTION_ARCHITECT_HOME o en ~/motion-architect.
if [ "$REPO_DIR" != "$HOME/motion-architect" ] && [ ! -e "$HOME/motion-architect" ]; then
  ln -s "$REPO_DIR" "$HOME/motion-architect"
  ok "atajo creado: ~/motion-architect → $REPO_DIR"
fi

# ── 5. Whisper (opcional) ──────────────────────────────────────────────────
if [ -f "$HOME/.config/watch/.env" ] && grep -qE '^(GROQ|OPENAI)_API_KEY=.+' "$HOME/.config/watch/.env"; then
  ok "watch: transcripción con Whisper configurada"
else
  warn "Opcional: para transcribir videos sin subtítulos, agrega GROQ_API_KEY u OPENAI_API_KEY en ~/.config/watch/.env"
  warn "Sin llave, Claude igual ve los frames del video (suficiente para analizar movimiento)."
fi

printf "\n%s  ◆ Listo.%s\n\n" "$c_coral" "$c_off"
cat <<EOF
  1. Reinicia Claude Code para que cargue los plugins nuevos.
  2. Abre Claude Code en esta carpeta:   cd "$REPO_DIR" && claude
  3. Pídele algo:   /motion un reel vertical de 15 s anunciando mi app, estilo cinematic
  4. Preview en vivo: cd studio && npm run studio   →  http://localhost:3000

EOF
