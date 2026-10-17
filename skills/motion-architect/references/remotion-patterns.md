# Patrones de Remotion

Para la API completa: https://www.remotion.dev/docs (la búsqueda de la doc funciona bien con WebFetch).

## Reglas de oro
- **Todo se anima con `useCurrentFrame()`.** Nada de CSS transitions, `@keyframes`, `setTimeout` ni `requestAnimationFrame`: no se renderizan.
- **Determinismo**: nada de `Math.random()`. Usa `random("seed")` de `remotion`.
- **Assets** en `studio/public/`, referenciados con `staticFile("references/logo.png")`.
- Imágenes con `<Img>`, video con `<OffthreadVideo>`, audio con `<Audio>`. Todo se importa de `remotion`.

## Esqueleto de una composición
```tsx
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { AbsoluteFill } from "remotion";
import { Background, KineticTitle, LogoReveal, SafeArea } from "../components";

const T = 12;
export const MI_VIDEO_DURATION = 75 + 90 - T;

export const MiVideo: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={75}>
        <SafeArea><KineticTitle text="Hook aquí." highlight={["Hook"]} /></SafeArea>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={90}>
        <SafeArea><LogoReveal /></SafeArea>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
```
Después regístrala en `src/compositions/index.ts`:
```ts
{ id: "MiVideo", component: MiVideo, durationInFrames: MI_VIDEO_DURATION, formats: ["vertical", "landscape"] },
```

## Piezas clave
- `interpolate(frame, [a, b], [x, y], { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" })`. Siempre con clamp.
- `spring({ frame: frame - delay, fps, config })` devuelve un valor de 0 a 1 (puede pasarse de 1 si hay rebote).
- `<Sequence from={30} durationInFrames={60}>`: dentro, `useCurrentFrame()` arranca en 0.
- `<Series>` para escenas sin solape y `<TransitionSeries>` para escenas con transición. Las transiciones restan duración.
- Transiciones disponibles en `@remotion/transitions/*`: `fade`, `slide`, `wipe`, `flip`, `clockWipe`, `iris`.

## Componentes del kit (`src/components`)
| Componente | Para qué | Props clave |
|---|---|---|
| `Background` | Fondo de marca con brillo que deriva | `glow` |
| `SafeArea` | Márgenes por formato | `align` |
| `KineticTitle` | Texto palabra por palabra | `text`, `delay`, `stagger`, `size`, `highlight` |
| `LogoReveal` | Símbolo + nombre con máscara | `name`, `tagline`, `delay` |
| `Counter` | Número que sube | `to`, `prefix`, `suffix`, `label` |
| `CardStack` | Tarjetas una por una | `cards`, `stagger` |
| `Caption` | Chip, kicker o lower-third | `text`, `tone` |
| `ImagePan` | Ken Burns sobre imagen | `src`, `zoomFrom`, `zoomTo`, `overlay` |

## Video de la persona dentro de la composición
```tsx
import { OffthreadVideo, staticFile } from "remotion";
<OffthreadVideo src={staticFile("references/clip.mp4")} startFrom={30} muted />
```

## Fuentes
`@remotion/google-fonts/<NombreSinEspacios>` con `loadFont("normal", { weights: [...], subsets: ["latin"] })`. Las fuentes locales van con `@font-face` y `staticFile`. Revisa `brand.md`.
