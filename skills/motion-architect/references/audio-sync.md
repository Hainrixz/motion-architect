# Audio y sincronía

El audio es opcional. Una pista de fondo bien elegida y pocos SFX en los momentos clave suelen ser mejor que el silencio, pero menos es más.

## De dónde sale
- **De la persona**: ponlo en `studio/public/music/` o `studio/public/sfx/`.
- **Brag**: si el plugin `brag` está instalado, trae SFX CC0 de Kenney y pistas con cues ya analizados. Encuéntralos con:
  `find ~/.claude/plugins ~/.claude/skills -path "*brag/assets*" -maxdepth 8 -type d 2>/dev/null | head`
  Copia **solo** los archivos que vas a usar a `studio/public/`. Revisa el README de `assets/music/` para la licencia de cada pista antes de usarla en algo comercial.
- Nunca descargues música con derechos de una plataforma para meterla en el video.

## En Remotion
```tsx
import { Audio, Sequence, staticFile, interpolate } from "remotion";
<Audio src={staticFile("music/track.mp3")} volume={(f) => interpolate(f, [0, 15, DUR - 20, DUR], [0, 0.6, 0.6, 0], { extrapolateRight: "clamp" })} />
<Sequence from={72}><Audio src={staticFile("sfx/whoosh.ogg")} volume={0.5} /></Sequence>
```

## Sincronizar con el beat
- Si conoces los BPM: `frames_por_beat = 30 * 60 / bpm` (120 bpm = 15 frames). Alinea los cortes y las entradas a múltiplos de eso.
- Para detectar los beats localmente puedes usar el script de Brag (`analyze_music_cues.py` con `uv`) si está instalado, o ffmpeg para ver la energía:
  `ffmpeg -i track.mp3 -af "astats=metadata=1:reset=15,ametadata=print:key=lavfi.astats.Overall.RMS_level" -f null - 2>&1 | grep RMS | head`
- Los cortes grandes van en los golpes fuertes. Los staggers chicos pueden ir a la corchea (la mitad del beat).

## SFX con criterio
- Uno por evento importante (reveal, logo, CTA), no uno por cada cosa que se mueve.
- Whoosh suave en transiciones, click en taps simulados, impacto grave en el logo.
- Volumen de SFX entre 0.3 y 0.6, con la música por debajo (0.4–0.6) cuando hay voz.
