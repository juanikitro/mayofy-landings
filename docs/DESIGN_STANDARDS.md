# Estándares de diseño (golden samples vigentes)

Este documento define la barra de calidad visual y comercial de las landings. Reemplaza a todos los estándares anteriores: los golden samples de `tandil-servicios-vehiculares` (v1, v2 y v3) y `cordoba-conversion` quedaron eliminados y no deben usarse como referencia.

Los únicos golden samples aprobados son las **3 landings de la corrida `amba-alta-conversion`** (julio 2026), diseñadas con Claude Code. El motor de diseño vigente para toda landing nueva es la skill **IMPECCABLE** (`frontend-design` queda como fallback compatible); ver `agents/design-director.md`.

> Nota sobre los golden samples y IMPECCABLE: estas 3 landings usan decisiones de arte deliberadas (papel crema, Fraunces, dark-theme con acento ámbar) que el detector de IMPECCABLE marca como slop. Son output **aprobado**, así que están excepcionadas por archivo en `.impeccable/config.json` (glob `**/amba-alta-conversion/**`) y no se degradan. Las landings nuevas se scanean completas: IMPECCABLE empuja la barra por encima de estos samples, no por debajo.

## Los 3 golden samples

| # | Negocio | Rubro | Dirección de arte | Tipografías | Paleta |
|---|---------|-------|-------------------|-------------|--------|
| 1 | Cerrajería La Madrileña (Monserrat, CABA) | Cerrajería y electricidad | "Cartel de cerrajería porteña": póster tipográfico construido desde la marquesina real amarilla y negra | Archivo Black + Barlow, números en IBM Plex Mono | Papel crema, negro humo, amarillo señalética, rojo sello puntual |
| 2 | Guapísimas Depilación (Palermo, CABA) | Depilación definitiva | "Boutique editorial de Palermo": serif editorial cálida con la mariposa dorada y el rosa de la recepción real | Fraunces + Karla | Crema, rosa empolvado, tinta espresso, dorado suave |
| 3 | Calderas YA Service 24 Hs (Benavídez, Tigre) | Service y urgencias de calderas | "Despacho de urgencia técnico": dark theme de sala de máquinas con el teléfono como elemento gráfico central | Anton + Chivo | Azul noche, celeste hielo, ámbar de alerta solo en CTAs |

Ubicaciones:

```text
Fuente:       data/frontends/amba-alta-conversion/<slug>/
Generadas:    generated/amba-alta-conversion/<slug>/
Screenshots:  output/screenshots/golden-samples/amba-alta-conversion/<slug>-desktop.png / -mobile.png
Specs:        data/site-specs/amba-alta-conversion-site-specs.json
```

## Qué las hace estándar

Estos principios salen de las 3 landings y son la definición operativa de "calidad de diseño" en este repo:

1. **La identidad sale del negocio real.** Paleta, motivos y texturas se extraen de las fotos verificadas (la marquesina amarilla de la cerrajería, la mariposa y los sillones rosa del centro de depilación, la sala de máquinas de calderas). Nunca de un template.
2. **Una dirección de arte por negocio, comprometida.** Cada landing sigue una sola tesis visual ejecutada con precisión. Dos landings de una misma tanda jamás comparten sistema visual, par tipográfico ni composición de hero.
3. **Tipografía con carácter.** Par display + cuerpo distintivo por landing, cargado de Google Fonts. Prohibido Inter, Roboto, Arial, system-ui, Space Grotesk y cualquier default genérico. Escala dramática: display enorme en hero, cuerpo 16–18px.
4. **Paleta dominante + acento filoso en CSS variables.** El CTA de contacto es el elemento visual más caliente de la página (el ámbar de Calderas YA es el ejemplo canónico).
5. **El copy nace de los datos verificados.** Español argentino (vos), reseñas literales citadas con autor, rating y horarios exactos. El ángulo comercial sale de lo que ya cuentan las reseñas (ej.: "primero te orientan por teléfono" en Calderas YA salió de dos reseñas reales).
6. **Conversión primero.** CTA `tel:` arriba del fold, barra sticky de llamada en mobile, teléfono tratado como elemento gráfico, link "Cómo llegar" a Google Maps, horarios siempre visibles, prueba social (rating + cantidad de reseñas) en el hero. **La ficha de contacto (el bloque de horario + dirección) siempre incluye el link a Google Maps junto a la dirección, no solo como botón aparte en otra parte de la sección.** Si la sección ya tiene un CTA "Cómo llegar" separado, la ficha lo repite igual: es el bloque que el visitante escanea al final para decidir cómo llegar.
7. **Texturas y motivos del oficio en CSS/SVG inline.** Franjas de obra, mariposa de línea, grid técnico de chapa: atmósfera sin assets externos. Única dependencia externa permitida: Google Fonts.
8. **Motion sobrio y progresivo.** Reveals escalonados en carga + IntersectionObserver en scroll con `script.js` vanilla mínimo; `prefers-reduced-motion` siempre respetado; sin JS pesado ni CDNs.
9. **Accesibilidad y SEO base.** `alt` descriptivos reales, contraste AA, semántica correcta, `lang="es-AR"`, `<title>` y meta description con servicio + barrio.
10. **Contrato QA del repo cumplido.** Footer con el texto exacto `Creado por Mayofy` enlazado a `https://www.instagram.com/mayofy.web/`, sin texto meta de IA ni palabras prohibidas, imágenes locales existentes, sin datos inventados (nada de precios, promos, años, zonas de cobertura ni claims médicos/técnicos sin evidencia).
11. **Hero memorable, no ficha de Maps.** El hero SIEMPRE parte de una imagen editorial local de stock o generada con IA, elegida para ser memorable y vender el rubro. **Nunca se usa la foto de Google Places como hero** (suelen ser flojas y bajan la barra); esas fotos sirven para extraer identidad/dirección de arte y como contexto documental en secciones internas. Para platos/productos destacados la imagen apetitosa va sin disclaimer (ver `docs/DATA_RULES.md`). Para un espacio físico específico (ej.: salón de eventos) el hero de stock/IA debe ser atmosférico y su `alt` no debe afirmar que es ese local puntual.

## Cómo usarlos

- Antes de diseñar una tanda nueva, abrir los screenshots de los 3 golden samples y navegar las fuentes. Son la referencia de densidad, pulido, ritmo mobile, naturalidad de copy y nivel de diferenciación.
- **No copiar sus layouts literalmente.** El estándar es el nivel de ejecución y los principios de arriba, no la composición puntual.
- Capturar evidencia de cualquier tanda con:

```powershell
node scripts/capture-golden-screenshots.mjs --base-url http://localhost:4173 --out output/screenshots/golden-samples/<run> --slugs "slug-1|slug-2|slug-3"
```

## Gate del diseño

La etapa `design-director` (`agents/design-director.md`) produce, por landing, un `conversion_template` y un `design_brief` firmado con `designed_by: "claude-code" o "codex"`. Ese entregable está validado:

- `npm run qa:design` falla si algún spec no tiene `conversion_template`, `design_brief` completo o el sello `designed_by: "claude-code" o "codex"`.
- `npm run generate ... --require-design-brief` no genera el sitio final sin ese brief.
- `npm run qa:impeccable -- generated/<run>` corre el detector determinístico de IMPECCABLE sobre las landings generadas y falla ante slop. Capa adicional, no reemplaza `qa:design`/`qa`/`qa:client`. Configuración y excepciones en `.impeccable/config.json`.

Es la forma dura del split Claude-diseña / Codex-programa: sin la etapa de diseño completada, la landing no llega a generación.

## Cómo se aprueba un golden sample nuevo

1. El agente de la sesión (Claude, o Codex si corre en Codex) diseña la landing con IMPECCABLE en la etapa `design-director` (ver división de roles en `CLAUDE.md` / `AGENTS.md` de la raíz) y corre `npm run qa:design`.
2. Codex la implementa a partir del `design_brief`.
3. Pasa `npm run qa`, `npm run qa:client` y `npm run qa:impeccable -- generated/<run>` (sin slop, salvo excepciones justificadas en `.impeccable/config.json`), más revisión visual desktop/mobile.
4. El usuario la aprueba explícitamente como golden sample.
5. Solo entonces se agregan sus capturas a `output/screenshots/golden-samples/` y se actualiza este documento. Este set solo se reemplaza con aprobación explícita del usuario.
