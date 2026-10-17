# Principios de movimiento

El resumen operativo para video. La versión completa está en `craft/` (filosofía, estándares, recetas y vocabulario).

## Easing
- **Entradas: ease-out.** Arrancan rápido y frenan suave, se sienten responsivas. Usa `ease.out` = `bezier(0.23, 1, 0.32, 1)`.
- **Movimiento dentro de pantalla: ease-in-out.** Usa `ease.inOut` = `bezier(0.77, 0, 0.175, 1)`.
- **Salidas: ease-in, y más cortas que la entrada** (más o menos el 70 % de su duración).
- **Lineal** solo para cosas constantes: rotación continua, progreso, contadores de reloj.
- Las curvas que vienen por defecto en CSS son débiles. Usa las de `lib/motion.ts`.

## Springs
- `springs.smooth` (sin rebote) es el default para todo lo serio.
- `springs.snappy` para tarjetas, botones y logos: rebote mínimo.
- `springs.bouncy` solo en tonos juguetones. Más de un rebote visible se siente barato.

## Escala y aparición
- Nunca `scale(0)`. Arranca entre 0.9 y 0.96 combinado con opacidad. En la vida real nada aparece de la nada.
- Opacidad + translateY de 16–40 px + blur de 4–8 px es la entrada base (`enterStyle`).
- Ojo con el `transform-origin`: si algo sale de un punto (un botón, una esquina), escala desde ahí.

## Timing (a 30 fps)
| Qué | Frames | Segundos |
|---|---|---|
| Micro (chip, icono) | 8–12 | 0.27–0.4 |
| Entrada de texto por palabra | 14–20 | 0.45–0.65 |
| Stagger entre palabras | 3–5 | 0.1–0.17 |
| Stagger entre tarjetas | 6–10 | 0.2–0.33 |
| Transición entre escenas | 10–18 | 0.33–0.6 |
| Hold mínimo de un titular | 30 + 3/letra | — |

## Jerarquía y foco
- Una sola cosa se mueve "en grande" a la vez. Lo demás espera o se queda quieto.
- El ojo sigue al movimiento. Mueve primero lo que quieres que se lea primero.
- Stagger con intención: el orden de entrada es el orden de lectura.

## Pulido que se nota sin verse
- `fontVariantNumeric: "tabular-nums"` en contadores, para que el ancho no baile.
- `letterSpacing` negativo (−0.02 a −0.05em) en titulares grandes.
- Sombras suaves y grandes en lugar de bordes duros.
- Pequeño drift de fondo (Background) para que la toma no se sienta congelada.
- Nada de easing "elástico" en texto largo.

## Checklist de revisión (estilo review-animations)
Entrega una tabla Antes | Después | Por qué para cada problema que encuentres:
1. ¿Alguna entrada usa ease-in o lineal?
2. ¿Algo escala desde 0 o aparece de golpe sin motivo?
3. ¿Se mueven varias cosas grandes a la vez?
4. ¿Algún texto está en pantalla menos de lo que tarda en leerse?
5. ¿Las salidas son más lentas que las entradas? Al revés de lo correcto.
6. ¿Hay algo en la safe zone de 9:16?
7. ¿El contraste de texto llega a 4.5:1?
