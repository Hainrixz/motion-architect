# Formatos

| Nombre | Tamaño | Uso | Id de composición |
|---|---|---|---|
| `landscape` | 1920×1080 (16:9) | YouTube, web, presentaciones | `<Id>-landscape` |
| `vertical` | 1080×1920 (9:16) | Reels, TikTok, Shorts, Stories | `<Id>-vertical` |
| `square` | 1080×1080 (1:1) | Feed, LinkedIn | `<Id>-square` |
| `portrait` | 1080×1350 (4:5) | Feed de Instagram | `<Id>-portrait` |

Todos van a 30 fps, h264 y yuv420p (configurado en `studio/remotion.config.ts`). Se definen en `studio/src/lib/formats.ts`.

## Safe zones
- **9:16**: deja libre el 14 % superior (usuario y audio) y el 20 % inferior (caption, botones). Tampoco pongas nada en los ~120 px de la derecha, donde van los íconos de like y comentario. `SafeArea` ya aplica los márgenes de arriba y abajo.
- **16:9**: margen de 80–96 px. Los títulos pueden ir alineados a la izquierda para un look editorial.
- **1:1 y 4:5**: margen de 96 px. El texto es un poco más chico que en 9:16.

## Diseño multi-formato
- Usa `useScale()`: `u` = lado corto / 1080. Escribe tamaños como `120 * u`.
- Usa `isVertical` e `isLandscape` para cambiar el layout: filas en horizontal, columnas en vertical.
- Revisa un still por formato. No asumas que si funciona en uno funciona en todos.

## Comandos
```bash
cd studio
npx remotion render src/index.ts <Id>-vertical out/<id>-vertical.mp4
npx remotion render src/index.ts <Id>-vertical out/<id>-vertical.mp4 --crf=16       # más calidad
npx remotion render src/index.ts <Id>-vertical out/<id>-vertical.gif --codec=gif --every-nth-frame=2 # GIF
npx remotion render src/index.ts <Id>-vertical out/<id>.mov --codec=prores --prores-profile=4444 # con alfa
npx remotion still  src/index.ts <Id>-vertical out/frame.png --frame=45
```
