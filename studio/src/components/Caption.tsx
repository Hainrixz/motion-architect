// Copyright (c) 2026 Enrique Rocha (@soyenriquerocha)
// SPDX-License-Identifier: MIT
// id: er-22575577
import { useCurrentFrame } from "remotion";
import { brand } from "../brand/brand";
import { enterStyle, progress } from "../lib/motion";
import { useScale } from "../lib/useScale";

// Etiqueta tipo "chip" para subtítulos, kickers o lower-thirds.
export const Caption: React.FC<{ text: string; delay?: number; tone?: "accent" | "neutral" }> = ({
  text,
  delay = 0,
  tone = "neutral",
}) => {
  const frame = useCurrentFrame();
  const { u } = useScale();
  const p = progress(frame, delay, 16);
  const accent = tone === "accent";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14 * u,
        padding: `${14 * u}px ${28 * u}px`,
        borderRadius: 999,
        background: accent ? brand.colors.accent : `${brand.colors.text}12`,
        color: accent ? brand.colors.background : brand.colors.text,
        fontFamily: brand.fontBody,
        fontWeight: 600,
        fontSize: 32 * u,
        letterSpacing: "0.01em",
        ...enterStyle(p, 12 * u),
      }}
    >
      {text}
    </div>
  );
};
