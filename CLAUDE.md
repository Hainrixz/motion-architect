# Motion Architect

Este repo es un estudio de motion graphics con Remotion (`studio/`) más un plugin de Claude Code (`skills/`, `agents/`, `commands/`).

- Cuando la persona pida una animación, un video o un motion graphic, usa la skill `motion-architect` y sigue su flujo: intake → referencias → marca → storyboard aprobado → build → stills → preview → render.
- Las composiciones viven en `studio/src/compositions/` y se registran en `studio/src/compositions/index.ts`.
- La marca está en `studio/brand.json`. Los componentes reutilizables están en `studio/src/components/` y las curvas y springs en `studio/src/lib/motion.ts`.
- Antes de renderizar: `cd studio && npx tsc --noEmit`.
- Todo corre local. Los renders van en `studio/out/`, que está en .gitignore.
