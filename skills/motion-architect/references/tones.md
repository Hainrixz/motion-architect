# Tonos

Presets traducidos a parámetros de Remotion. Cada tono cambia el ritmo, la tipografía y las transiciones.

| Tono | Escenas (15–20 s) | Por escena | Tipografía | Springs / easing | Transiciones |
|---|---|---|---|---|---|
| `default` | 4–5 | 3–5 s | Mixed case, peso 700–800 | `springs.snappy`, `ease.out` | fade 10–12 f, slide |
| `polished` | 3–4 | 4–6 s | Peso 400–600, tracking amplio | `springs.smooth`, entradas de 24–30 f | fade lento 18–24 f |
| `cinematic` | 4–5 | 3–5 s | Muy grande, serif o display condensada | `ease.inOut`, zooms lentos (ImagePan) | fade a negro, cross-zoom |
| `chaotic` | 6–8 | 0.7–2 s | MAYÚSCULAS, 800+, palabras rotadas | `springs.bouncy`, stagger 2 f | cortes duros, slide rápido 6 f |
| `deadpan` | 3–4 | 4–6 s | Una palabra a la vez, mucho vacío | lineal o `ease.out` muy corto | corte seco |
| `app-store` | 4–6 | 2.5–4 s | Limpia, sans, 600–700 | `springs.snappy`, CardStack | slide horizontal, fade |
| `editorial` | 4–5 | 3–4 s | Serif display + sans, alineado a la izquierda | `ease.out`, máscaras (clipPath) | wipe, fade |

## Tono libre
Si te dan algo como "tipo keynote de Apple" o "como anuncio de los 90", escribe una línea de interpretación en el storyboard: "pausas largas, fondo negro, texto blanco centrado, una idea por pantalla". Luego elige el preset más cercano como base.
