// Copyright (c) 2026 Enrique Rocha (@soyenriquerocha)
// SPDX-License-Identifier: MIT
// id: er-22575577
import { Easing, interpolate, spring } from "remotion";

// Curvas de la casa: ease-out fuerte para entradas,
// ease-in-out para movimientos dentro de pantalla. Nada de ease-in para entrar.
export const ease = {
  out: Easing.bezier(0.23, 1, 0.32, 1),
  inOut: Easing.bezier(0.77, 0, 0.175, 1),
  drawer: Easing.bezier(0.32, 0.72, 0, 1),
  in: Easing.bezier(0.55, 0, 1, 0.45), // solo para salidas
};

// Presets de spring. "smooth" sin rebote es el default seguro.
export const springs = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  bouncy: { damping: 12 },
  heavy: { damping: 15, stiffness: 80, mass: 2 },
};

/** Progreso 0→1 entre `start` y `start + duration` (en frames) con easing. */
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing = ease.out,
) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Spring que arranca en `delay`. */
export const springAt = (
  frame: number,
  fps: number,
  delay = 0,
  config: Partial<typeof springs.smooth & { stiffness: number; mass: number }> = springs.smooth,
) => spring({ frame: frame - delay, fps, config });

/**
 * Entrada estándar: sube unos px, aparece y se enfoca.
 * Regla: nunca escalar desde 0; arrancar en 0.96 se siente natural.
 */
export const enterStyle = (p: number, distance = 24): React.CSSProperties => ({
  opacity: p,
  transform: `translateY(${(1 - p) * distance}px) scale(${0.96 + 0.04 * p})`,
  filter: `blur(${(1 - p) * 8}px)`,
});

export const mix = (p: number, a: number, b: number) => a + (b - a) * p;
