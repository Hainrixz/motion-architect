// Copyright (c) 2026 Enrique Rocha (@soyenriquerocha)
// SPDX-License-Identifier: MIT
// id: er-22575577
import { AbsoluteFill } from "remotion";
import { useScale } from "../lib/useScale";

// Márgenes seguros por formato. En vertical deja libre la UI de Reels/TikTok
// (arriba ~14%, abajo ~20%).
export const SafeArea: React.FC<{ children: React.ReactNode; align?: "center" | "start" }> = ({
  children,
  align = "center",
}) => {
  const { u, height, isVertical } = useScale();
  const padX = 96 * u;
  const padTop = isVertical ? height * 0.14 : 80 * u;
  const padBottom = isVertical ? height * 0.2 : 80 * u;
  return (
    <AbsoluteFill
      style={{
        padding: `${padTop}px ${padX}px ${padBottom}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align === "center" ? "center" : "left",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
