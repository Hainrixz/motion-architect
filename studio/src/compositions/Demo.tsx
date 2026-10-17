import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill } from "remotion";
import { Background, Caption, CardStack, Counter, KineticTitle, LogoReveal, SafeArea } from "../components";
import { useScale } from "../lib/useScale";

// Demo de referencia: hook → reveal → highlights → dato → outro.
// Es la estructura de storyboard de Brag, construida con piezas reutilizables.
const T = 12; // frames de transición

export const DEMO_DURATION = 75 + 90 + 105 + 75 + 90 - 4 * T;

const Hook: React.FC = () => {
  const { isVertical } = useScale();
  return (
    <SafeArea>
      <Caption text="Motion graphics · con Claude" delay={0} />
      <div style={{ height: 40 }} />
      <KineticTitle
        text="Tus ideas merecen moverse."
        highlight={["moverse"]}
        size={isVertical ? 130 : 150}
        delay={6}
      />
    </SafeArea>
  );
};

const Reveal: React.FC = () => (
  <SafeArea>
    <LogoReveal delay={4} />
  </SafeArea>
);

const Highlights: React.FC = () => {
  const { isLandscape } = useScale();
  return (
    <SafeArea>
      <KineticTitle text="Tú das la referencia." size={isLandscape ? 88 : 96} delay={0} />
      <div style={{ height: 56 }} />
      <CardStack
        delay={14}
        cards={[
          { icon: "▶", title: "Videos", body: "Claude los ve con /watch" },
          { icon: "◼", title: "Imágenes", body: "Estilo, color y composición" },
          { icon: "✦", title: "Tu marca", body: "Paleta y tipografía propias" },
        ]}
      />
    </SafeArea>
  );
};

const Stat: React.FC = () => (
  <SafeArea>
    <Counter to={4} label="formatos: 16:9 · 9:16 · 1:1 · 4:5" duration={30} />
  </SafeArea>
);

const Outro: React.FC = () => {
  const { isVertical } = useScale();
  return (
    <SafeArea>
      <KineticTitle text="Un comando." size={isVertical ? 120 : 140} delay={0} />
      <KineticTitle
        text="Todo local."
        size={isVertical ? 120 : 140}
        delay={10}
        highlight={["local"]}
      />
      <div style={{ height: 48 }} />
      <Caption text="./install.sh  →  /motion" tone="accent" delay={26} />
    </SafeArea>
  );
};

export const Demo: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={75}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={90}>
        <Reveal />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: T })}
      />
      <TransitionSeries.Sequence durationInFrames={105}>
        <Highlights />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={75}>
        <Stat />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={90}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
