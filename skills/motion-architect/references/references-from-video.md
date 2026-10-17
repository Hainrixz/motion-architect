# Referencias desde video

La persona puede pasar una URL (YouTube, Instagram, TikTok, X; lo que soporte yt-dlp) o un archivo local.

## Cómo verlas
1. Usa el **motor de visión** (`vision.md`): `python3 <skill-dir>/engine/vision/analyze.py "<url-o-ruta>" --engine local`. Lee con Read los frames que devuelve.
   - Para movimiento fino: `--detail token-burner` o acota con `--start 0:05 --end 0:12 --fps 6`.
   - Sin llave de transcripción: `--no-whisper`.
2. Para medir cortes exactos también puedes usar ffmpeg:
   ```bash
   ffmpeg -i ref.mp4 -vf "select='gt(scene,0.3)',showinfo" -vsync vfr /tmp/cut_%03d.jpg 2>&1 | grep -o "pts_time:[0-9.]*"
   ```
3. Si hay varios videos, despacha el subagente `reference-analyst` (uno por video, en paralelo).

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
