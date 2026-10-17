// Los cuatro formatos que soporta Motion Architect.
export const FORMATS = {
  landscape: { width: 1920, height: 1080, label: "16:9 · YouTube, web, presentaciones" },
  vertical: { width: 1080, height: 1920, label: "9:16 · Reels, TikTok, Shorts" },
  square: { width: 1080, height: 1080, label: "1:1 · Feed" },
  portrait: { width: 1080, height: 1350, label: "4:5 · Feed de Instagram" },
} as const;

export type FormatName = keyof typeof FORMATS;
export const FORMAT_NAMES = Object.keys(FORMATS) as FormatName[];

export const FPS = 30;

export const seconds = (s: number) => Math.round(s * FPS);
