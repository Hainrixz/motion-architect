<p align="center">
  <img src="docs/hero.svg" alt="Motion Architect — motion graphics con Claude y Remotion, todo local" width="100%">
</p>

<p align="center">
  <b>Motion graphics con Claude, en tu compu.</b><br>
  Le das videos, imágenes y tu marca. Claude diseña, anima y renderiza con Remotion.
</p>

<p align="center">
  <a href="#instalación">Instalación</a> ·
  <a href="#cómo-se-usa">Cómo se usa</a> ·
  <a href="#formatos">Formatos</a> ·
  <a href="#cómo-funciona-por-dentro">Cómo funciona</a> ·
  <a href="README.en.md">English</a>
</p>

<p align="center">
  <img alt="Remotion" src="https://img.shields.io/badge/Remotion-4.0-FF5B3A?style=flat-square">
  <img alt="Claude Code" src="https://img.shields.io/badge/Claude_Code-plugin-0B0B0F?style=flat-square">
  <img alt="Local" src="https://img.shields.io/badge/100%25-local-7CE0C3?style=flat-square">
  <img alt="MIT" src="https://img.shields.io/badge/license-MIT-F4F1EA?style=flat-square">
</p>

---

## Qué es

**Motion Architect** es un agente de Claude Code para hacer motion graphics. Junta en una sola instalación las mejores skills de diseño y animación que están saliendo, sobre un estudio de [Remotion](https://www.remotion.dev) listo para usar:

| Pieza | Qué aporta |
|---|---|
| **[Brag](https://github.com/latent-spaces/brag)** | El método de video de lanzamiento: storyboard hook → reveal → highlights → remate, tonos y audio con intención |
| **[Emil Kowalski skills](https://github.com/emilkowalski/skills)** | El criterio de animación: easing, timing, springs y el pulido que se siente aunque no se vea |
| **[UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)** | Estilos, paletas, pares tipográficos y jerarquía visual |
| **[watch](https://github.com/bradautomates/claude-video)** | Claude *ve* tus videos de referencia: frames y transcripción |
| **[Remotion Agent Skills](https://github.com/remotion-dev/skills)** | Buenas prácticas oficiales de Remotion |
| **Estudio Motion Architect** | Proyecto Remotion con componentes animados, 4 formatos y tu marca en un JSON |

## La misión

Que cualquiera pueda hacer motion graphics de calidad hablando con Claude, como si tuviera un motion designer al lado. Sin After Effects y sin pelearse con keyframes. Le muestras un video que te gusta, le pasas tu logo y le dices *"algo así, pero para mi lanzamiento, en vertical"*.

Todo corre **en tu computadora**: el render, el análisis de videos y el preview. Nada se sube a ningún lado.

<p align="center">
  <img src="docs/demo.gif" alt="Demo renderizada con Motion Architect" width="80%"><br>
  <sub>Este demo salió del estudio incluido: <code>npx remotion render src/index.ts Demo-landscape</code></sub>
</p>

## Instalación

**Requisitos:** macOS o Linux, [Claude Code](https://claude.com/claude-code), Node 18+, ffmpeg, yt-dlp y Python 3. El instalador revisa todo y, en macOS, ofrece instalar con Homebrew lo que falte.

```bash
git clone https://github.com/Hainrixz/motion-architect.git
cd motion-architect
./install.sh
```

Eso es todo. El instalador:

1. Revisa e instala dependencias (Node, ffmpeg, yt-dlp, Python).
2. Instala el estudio de Remotion (`studio/`).
3. Instala en Claude Code: Motion Architect, Brag, UI/UX Pro Max, watch, las skills de Emil Kowalski y las de Remotion.
4. Crea el atajo `~/motion-architect` para que el agente encuentre el estudio desde cualquier carpeta.

Puedes correrlo varias veces sin problema: lo que ya está instalado se salta. Usa `./install.sh --yes` para no responder preguntas.

> **Repo privado:** mientras el repo sea privado, para clonarlo necesitas acceso en GitHub.

<details>
<summary><b>Opcional: transcripción de videos sin subtítulos</b></summary>

`watch` usa los subtítulos del video cuando existen. Para los que no tienen, puede transcribir con Whisper (Groq u OpenAI). Agrega **una** de estas líneas en `~/.config/watch/.env`:

```
GROQ_API_KEY=...
OPENAI_API_KEY=...
```

Sin llave, Claude igual ve los frames del video, que es lo que importa para analizar movimiento.
</details>

## Cómo se usa

Abre Claude Code en la carpeta del repo (o en cualquier otra; el agente encuentra el estudio) y pide:

```
/motion un reel vertical de 15 s anunciando mi app de finanzas, estilo cinematic
```

Claude va a:

1. **Preguntarte lo que falte, todo en un mensaje:** formato, duración, tono, marca y música.
2. **Ver tus referencias:** videos (URL o archivo) con `/watch`, imágenes y capturas.
3. **Armar tu marca:** colores, fuentes y estilo en `studio/brand.json`.
4. **Escribir el storyboard** y esperar a que lo apruebes.
5. **Construir la animación** en React con Remotion y revisarla con el criterio de Emil Kowalski.
6. **Abrir Remotion Studio** en `localhost:3000` para que veas el preview y lo ajustes.
7. **Renderizar** el mp4 en los formatos que pediste, con poster.

### Ejemplos de prompts

```
/motion anima mi logo (está en ~/Desktop/logo.svg), 5 segundos, 16:9 y 9:16
```
```
Mira este video https://www.instagram.com/reel/... y hazme algo con ese ritmo
pero con mi marca. Vertical, 12 s.
```
```
/motion intro para mi canal de YouTube, estilo editorial, colores de esta imagen: ./captura.png
```
```
/motion un dato animado: "pasamos de 0 a 10,000 usuarios en 30 días", 4:5 para el feed
```
```
/motion-render MiVideo all
```

### Preview en vivo

```bash
cd studio && npm run studio     # → http://localhost:3000
```

Ahí ves cada composición en cada formato, puedes scrubbear el timeline y los cambios que hace Claude aparecen al instante.

## Formatos

| Formato | Tamaño | Para |
|---|---|---|
| **Vertical** 9:16 | 1080×1920 | Reels, TikTok, Shorts, Stories |
| **Horizontal** 16:9 | 1920×1080 | YouTube, web, presentaciones |
| **Cuadrado** 1:1 | 1080×1080 | Feed, LinkedIn |
| **Feed** 4:5 | 1080×1350 | Feed de Instagram |

Todo se diseña con unidades relativas, así que una misma animación se adapta a los cuatro. Las safe zones de Reels y TikTok ya vienen respetadas.

## Cómo funciona por dentro

```mermaid
flowchart LR
  A[Tu idea + referencias] --> B{/motion}
  B --> C[watch<br/>ve videos]
  B --> D[UI/UX Pro Max<br/>marca y estilo]
  C --> E[Storyboard<br/>método Brag]
  D --> E
  E -->|apruebas| F[Composición React<br/>Remotion]
  F --> G[Revisión<br/>criterio Emil]
  G --> H[Remotion Studio<br/>preview]
  H --> I[mp4 en 9:16 · 16:9 · 1:1 · 4:5]
```

```
motion-architect/
├─ install.sh                    instalador de un comando
├─ .claude-plugin/               plugin de Claude Code
├─ skills/motion-architect/      el agente y sus referencias (storyboard, tonos, formatos, principios…)
├─ agents/reference-analyst.md   subagente que analiza videos de referencia
├─ commands/                     /motion y /motion-render
└─ studio/                       proyecto Remotion
   ├─ brand.json                 tu marca: colores, fuentes, estilo
   ├─ src/components/            KineticTitle, LogoReveal, Counter, CardStack, Caption, ImagePan…
   ├─ src/lib/motion.ts          curvas de easing y springs
   ├─ src/compositions/          tus videos (Demo incluido)
   └─ public/                    referencias, música, SFX, logos
```

## Créditos

Motion Architect se apoya en el trabajo de otras personas. Cada pieza se instala desde su repo original y conserva su licencia. Detalles en [CREDITS.md](CREDITS.md).

- **Brag**, de Shunit Haviv Hakimi / Latent Spaces (MIT)
- **Skills de Emil Kowalski** (MIT), con más en [animations.dev](https://animations.dev)
- **UI/UX Pro Max**, de nextlevelbuilder (MIT)
- **claude-video / watch**, de Bradley Bonanno (MIT)
- **Remotion** y Remotion Agent Skills, de Remotion AG

## Licencia

El código de Motion Architect es **MIT**.

**Ojo con Remotion:** es gratis para personas, organizaciones sin fines de lucro y empresas de hasta 3 personas. Las empresas más grandes necesitan una [licencia de empresa](https://www.remotion.dev/license). Revisa sus términos antes de usarlo comercialmente.

---

<p align="center"><sub>Hecho por <a href="https://github.com/Hainrixz">Enrique Rocha</a> · Tododeia</sub></p>
