# Motor de diseño

Base de datos local de estilos, paletas, pares tipográficos y patrones visuales. No necesita internet ni dependencias: solo Python 3.

```bash
python3 <skill-dir>/engine/design/scripts/search.py "<producto> <industria> <mood>" --design-system -p "<Nombre>"
python3 <skill-dir>/engine/design/scripts/search.py "<mood>" --domain color -n 5
python3 <skill-dir>/engine/design/scripts/search.py "<mood>" --domain typography -n 5
python3 <skill-dir>/engine/design/scripts/search.py "<mood>" --domain google-fonts -n 5
python3 <skill-dir>/engine/design/scripts/search.py "<estilo>" --domain style
```

## Cómo usarlo para video
- `--design-system` te da estilo, paleta, tipografía y efectos de un jalón. Ignora lo que sea de web (secciones, formularios, navegación) y quédate con color, tipo, estilo y mood.
- Pasa la paleta a `studio/brand.json` y las fuentes a `studio/src/brand/brand.ts` (ver `brand.md`). Revisa que la fuente exista en `@remotion/google-fonts`.
- `--domain style` describe el carácter visual. Tradúcelo a movimiento: brutalism = cortes duros; glassmorphism = blur y capas; minimal = mucho aire y entradas lentas.
- Reglas rápidas de contraste y jerarquía: `<skill-dir>/engine/design/quick-reference.md`.
