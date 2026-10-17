# Referencias desde video

La persona puede pasar una URL (YouTube, Instagram, TikTok, X; lo que soporte yt-dlp) o un archivo local.

## Cómo verlas
1. Usa la skill **`watch`** (plugin `watch@claude-video`). Descarga el video, extrae frames con ffmpeg y trae la transcripción si hay captions.
   - Si no hay llave de Whisper, solo trae frames. Para analizar movimiento eso alcanza.
   - Para movimiento fino: `--detail token-burner` (sin tope de frames) o acota con `--start 0:05 --end 0:12 --fps 6`.
   - Sin llave de Whisper: `--no-whisper`.
2. Si `watch` no está, hazlo a mano con ffmpeg, todo local:
   ```bash
   mkdir -p studio/public/references/frames
   ffmpeg -i ref.mp4 -vf "fps=4,scale=720:-1" studio/public/references/frames/f_%04d.jpg
   ffmpeg -i ref.mp4 -vf "select='gt(scene,0.3)',showinfo" -vsync vfr studio/public/references/frames/cut_%03d.jpg 2>&1 | grep pts_time
   ```
   El segundo comando te da los tiempos de corte.
3. Para varios videos, despacha el subagente `reference-analyst` (uno por video, en paralelo).

## Qué extraer (motion spec)
```json
{
  "fuente": "url o ruta",
  "duracion_s": 14.2,
  "formato": "9:16",
  "cortes_s": [0, 1.8, 3.1, 5.0],
  "ritmo": "rápido: escenas de 1.2–2 s, cortes en el beat",
  "paleta": ["#0E0E10", "#F2F2F2", "#C6FF3D"],
  "tipografia": "grotesk pesada, mayúsculas, tracking apretado",
  "movimientos": ["texto entra por máscara de abajo", "zoom-in lento sobre producto", "tarjetas en stagger"],
  "easing_percibido": "ease-out fuerte, sin rebote",
  "transiciones": ["corte duro", "whip-pan"],
  "audio": "beat electrónico ~120 bpm, SFX en cada corte",
  "lo_que_hace_que_funcione": "una palabra por beat y contraste brutal",
  "aplicar_a_nuestro_video": ["usar ritmo de 1.5 s", "máscara de abajo en KineticTitle"]
}
```

## Reglas
- Se toma el **lenguaje** (ritmo, estructura, tipo de movimiento), no el contenido ni los assets de la referencia.
- Copia los frames útiles a `studio/public/references/` solo como referencia de trabajo. No van en el video final a menos que sean de la persona.
- Estima el easing por la distancia entre frames consecutivos: mucho movimiento al inicio y poco al final es ease-out.
