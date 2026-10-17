# Motor de visión

Ve videos de forma local: los descarga con yt-dlp si son URL, saca frames con ffmpeg (scene-aware) y trae los subtítulos si existen.

```bash
python3 <skill-dir>/engine/vision/setup.py --check        # exit 0 = listo; 2 = falta ffmpeg/yt-dlp → ./install.sh
python3 <skill-dir>/engine/vision/analyze.py "<url-o-ruta>" --engine local
```

Después, **lee con Read las rutas de frames** que imprime el reporte. Así es como ves el video.

## Flags útiles
| Flag | Uso |
|---|---|
| `--engine local` | **Siempre.** Todo se procesa en la máquina |
| `--detail efficient\|balanced\|token-burner` | Pocos frames, normal (default) o sin tope (para movimiento fino) |
| `--start 0:05 --end 0:12` | Solo un tramo |
| `--fps 6` | Más frames por segundo en el tramo (para medir easing) |
| `--no-whisper` | No intentar transcribir el audio |
| `--question "..."` | Pregunta concreta que quieres responder con el video |

## Transcripción (opcional)
Si el video no tiene subtítulos, el motor puede transcribir con Whisper si la persona configuró una llave en `~/.config/motion-architect/.env` (`GROQ_API_KEY=` u `OPENAI_API_KEY=`). Sin llave, usa `--no-whisper`: para analizar movimiento bastan los frames. Nunca pidas ni imprimas la llave; si la quieren configurar, diles en qué archivo va.
