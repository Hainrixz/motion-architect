---
description: Renderiza una composición de Motion Architect a mp4 (y poster) en el formato que elijas.
argument-hint: "<Id> [vertical|landscape|square|portrait|all]"
---

Renderiza con Remotion, de forma local, la composición indicada: $ARGUMENTS

1. Encuentra la carpeta `studio/` (ver la skill `motion-architect`) y lista los ids disponibles con `npx remotion compositions src/index.ts`.
2. Si no dieron formato, usa los que estén registrados para ese id. `all` significa todos.
3. Por formato: `npx remotion render src/index.ts <Id>-<formato> out/<id>-<formato>.mp4`. Después saca el poster con ffmpeg y verifica las dimensiones con ffprobe.
4. Entrega las rutas con formato, duración y peso. Si algo falla, explica en una frase qué pasó y cuál es el siguiente paso.
