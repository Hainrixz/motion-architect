// Copyright (c) 2026 Enrique Rocha (@soyenriquerocha)
// SPDX-License-Identifier: MIT
// id: er-22575577
import { Demo, DEMO_DURATION } from "./Demo";

// Registro de composiciones. Cada entrada se publica en los formatos que indiques
// con el id "<id>-<formato>" (p. ej. "Demo-vertical").
// Para agregar un video nuevo: crea src/compositions/MiVideo.tsx y añádelo aquí.
export const compositions = [
  {
    id: "Demo",
    component: Demo,
    durationInFrames: DEMO_DURATION,
    formats: ["landscape", "vertical", "square", "portrait"],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  component: React.FC;
  durationInFrames: number;
  formats: ReadonlyArray<"landscape" | "vertical" | "square" | "portrait">;
}>;
