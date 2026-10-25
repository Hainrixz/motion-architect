// Copyright (c) 2026 Enrique Rocha (@soyenriquerocha)
// SPDX-License-Identifier: MIT
// id: er-22575577
import { Composition, Folder } from "remotion";
import { compositions } from "./compositions";
import { FORMATS, FPS } from "./lib/formats";

export const RemotionRoot: React.FC = () => (
  <>
    {compositions.map((c) => (
      <Folder key={c.id} name={c.id}>
        {c.formats.map((f) => (
          <Composition
            key={f}
            id={`${c.id}-${f}`}
            component={c.component}
            durationInFrames={c.durationInFrames}
            fps={FPS}
            width={FORMATS[f].width}
            height={FORMATS[f].height}
          />
        ))}
      </Folder>
    ))}
  </>
);
