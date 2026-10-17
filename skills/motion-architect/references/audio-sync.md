# Audio y sincronía

El audio es opcional. Una pista de fondo bien elegida y pocos SFX en los momentos clave suelen ser mejor que el silencio, pero menos es más.

## De dónde sale
- **SFX incluidos (CC0)** en `studio/public/sfx/`: `interface/` (clicks, switches, drops), `impact/` (golpes, campanas), `ui/`, `casino/` y `keyboard/` (teclas sueltas para animaciones de tipeo). El índice con usos recomendados y riesgo de agudos está en `sfx-library.md`. Úsalos con `staticFile("sfx/impact/impactSoft_medium_000.ogg")`.
- **Música**: la pone la persona en `studio/public/music/`. Si no tiene, sugiérele bibliotecas con licencia clara. Nunca descargues música con derechos de una plataforma para meterla en el video.

## En Remotion
```tsx
import { Audio, Sequence, staticFile, interpolate } from "remotion";
<Audio src={staticFile("music/track.mp3")} volume={(f) => interpolate(f, [0, 15, DUR - 20, DUR], [0, 0.6, 0.6, 0], { extrapolateRight: "clamp" })} />
<Sequence from={72}><Audio src={staticFile("sfx/whoosh.ogg")} volume={0.5} /></Sequence>
```

## Sincronizar con el beat
- Si conoces los BPM: `frames_por_beat = 30 * 60 / bpm` (120 bpm = 15 frames). Alinea los cortes y las entradas a múltiplos de eso.
- Para ver la energía de la pista y ubicar los golpes, localmente con ffmpeg:
  `ffmpeg -i track.mp3 -af "astats=metadata=1:reset=15,ametadata=print:key=lavfi.astats.Overall.RMS_level" -f null - 2>&1 | grep RMS | head`
- Los cortes grandes van en los golpes fuertes. Los staggers chicos pueden ir a la corchea (la mitad del beat).

## SFX con criterio
- Uno por evento importante (reveal, logo, CTA), no uno por cada cosa que se mueve.
- Whoosh suave en transiciones, click en taps simulados, impacto grave en el logo.
- Volumen de SFX entre 0.3 y 0.6, con la música por debajo (0.4–0.6) cuando hay voz.
