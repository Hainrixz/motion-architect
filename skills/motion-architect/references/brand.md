# Marca

La marca vive en `studio/brand.json`. Los componentes la leen desde `studio/src/brand/brand.ts`.

```json
{
  "name": "Nombre",
  "tagline": "Claim corto",
  "colors": { "background": "#…", "surface": "#…", "text": "#…", "muted": "#…", "accent": "#…", "accent2": "#…" },
  "fonts": { "display": "Bricolage Grotesque", "body": "Geist" },
  "radius": 28,
  "style": "Una línea con el carácter visual"
}
```

## De dónde sale
1. **La persona la da**: hex, fuentes, logo. Úsala tal cual.
2. **De una imagen o captura**: léela, extrae 3 a 5 colores dominantes (fondo, texto, acento) e identifica el estilo tipográfico.
3. **De un sitio**: pide la URL y mira su CSS y capturas. Busca variables `--color-*` y `font-family`.
4. **No hay marca**: usa el motor de diseño (`design-engine.md`) para proponer estilo, paleta y par tipográfico según el tono:
   `python3 <skill-dir>/engine/design/scripts/search.py "<producto> <industria> <mood>" --design-system -p "<Nombre>"`

## Cambiar fuentes
1. Mira si existe `studio/node_modules/@remotion/google-fonts/dist/esm/<NombreSinEspacios>.mjs`.
2. Cambia los imports en `src/brand/brand.ts`:
   ```ts
   import { loadFont as loadDisplay } from "@remotion/google-fonts/Syne";
   ```
3. Actualiza `fonts` en `brand.json`. Es solo informativo; la fuente real es la del import.
4. Fuente propia (.woff2/.ttf): ponla en `studio/public/fonts/` y cárgala con `loadFont` de `@remotion/fonts`. Si no está instalado: `npm i @remotion/fonts@<misma versión que remotion>`.

## Contraste
Texto sobre fondo ≥ 4.5:1. Texto grande (más de 48 px) ≥ 3:1. Si el acento no llega sobre el fondo, úsalo en formas y no en texto.

## Logo
Archivo de la persona en `studio/public/brand/logo.svg` (o png), usado con `<Img src={staticFile("brand/logo.svg")} />`. `LogoReveal` trae un símbolo genérico: reemplázalo por el logo real cuando exista. Nunca recrees el logo de una marca de terceros.
