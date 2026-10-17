# Storyboard

Un storyboard es una página. Es la estrella polar del video.

## Estructura por defecto
```
Hook (2–3 s) → Reveal → 2–3 Highlights → Punchline / Outro
```
- **Hook**: el momento más importante. ¿Qué palabra, imagen o movimiento se gana los siguientes 15 segundos?
- **Reveal**: qué es o quién es (nombre, logo).
- **Highlights**: uno por escena. Concretos ("el contador sube a 10,000"), no genéricos ("features").
- **Outro**: el remate, el nombre y el CTA. Que respire.

Adáptalo: un intro de canal puede ser solo Hook → Reveal, y un dato animado puede ser Hook → Counter → Outro.

## Plantilla (`studio/storyboards/<id>.md`)
```markdown
# <Título>
- Formato(s): vertical 1080x1920 [+ …]
- Duración: <s> s = <frames> frames @30fps
- Tono: <preset> — <una línea de interpretación>
- Referencias: <motion spec resumido o "ninguna">
- Marca: bg <hex> · texto <hex> · acento <hex> · display <fuente> · body <fuente>

## Escena 1 — Hook — 0–75 (2.5 s)
En pantalla: <qué se ve, texto exacto>
Movimiento: <componente + cómo entra: KineticTitle stagger 4, ease.out>
Transición → 2: <fade 12f / slide from-bottom / corte>
Audio: <whoosh suave en f60 / nada>

## Escena 2 — …
```

## Duración
- Suma las escenas y resta los frames de transición (las de `TransitionSeries` se solapan). Haz la cuenta.
- Rango sano: 6–30 s. Para redes, el punto ideal está entre 12 y 20 s.
- Por escena: 2–5 s. Menos de 1.5 s solo en tono `chaotic`.

## Antes de pedir aprobación
- ¿El hook se entiende en silencio y sin contexto?
- ¿Cada escena tiene una sola idea?
- ¿Todo el texto se puede leer en el tiempo que está en pantalla?
