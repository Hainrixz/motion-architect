# Brief de ejemplo

Pega esto en Claude Code (después de `./install.sh`) para ver el flujo completo:

```
/motion Quiero un reel para anunciar "Pulso", una app que te dice cuánto gastaste esta semana.
- Formato: vertical 9:16, y también 4:5 para el feed
- Duración: 15 s
- Tono: polished
- Referencia: este video me gusta por el ritmo → <pega una URL o ruta>
- Marca: fondo #0E1116, texto #F5F5F0, acento #3DDC97, fuente display "Syne"
- Texto: "Tu dinero, en una mirada." / "Pulso" / "Gratis en iOS y Android"
- Sin música
```

Lo que va a pasar:
1. Claude ve la referencia y te resume su motion spec: ritmo, cortes, paleta y tipo de movimiento.
2. Actualiza `studio/brand.json` y las fuentes.
3. Te muestra el storyboard (`studio/storyboards/pulso.md`) y espera tu sí.
4. Crea `studio/src/compositions/Pulso.tsx`, revisa stills y te pide abrir Remotion Studio.
5. Renderiza `studio/out/pulso-vertical.mp4` y `studio/out/pulso-portrait.mp4`, cada uno con su poster.
