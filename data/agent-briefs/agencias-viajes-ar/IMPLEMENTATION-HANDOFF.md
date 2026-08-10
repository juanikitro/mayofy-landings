# Handoff de implementación · corrida `agencias-viajes-ar`

Diseño cerrado y firmado por Claude Code (etapa `design-director`, motor IMPECCABLE). Este documento es el contrato de implementación: **Codex escribe el código, no rediseña**.

- Briefs firmados: `data/site-specs/agencias-viajes-ar-site-specs.json` (`design_brief.designed_by: "claude-code"`). Leer el brief completo de cada slug antes de escribir.
- Datos verificados: `data/agencias-viajes-ar-businesses.json`. **Única fuente de hechos.**
- Barra de calidad: `data/frontends/amba-alta-conversion/*/` (golden samples, ~14-17 KB de HTML y ~18-25 KB de CSS por landing) y `docs/DESIGN_STANDARDS.md`.
- Reglas de datos: `docs/DATA_RULES.md`. Gate de entrega: `docs/CLIENT_READINESS_QA.md`.

## Qué hay que producir

Por cada slug, en `data/frontends/agencias-viajes-ar/<slug>/`:

```
index.html      HTML semántico completo, lang="es-AR"
styles.css      CSS propio de esa landing (sin framework)
script.js       JS vanilla mínimo (reveals + IntersectionObserver)
assets/fallback.svg   SVG local en la paleta de esa landing (fallback del hero)
```

Ya están en su lugar y **no se tocan**:

```
assets/hero.jpg     imagen editorial de destino (hero, ya elegida)
assets/foto-1..3.jpg  fotos verificadas de Google Places (contexto documental)
```

`agent_frontend` ya está declarado en los specs apuntando a `source_dir`. No hace falta editar los specs.

## Las 5 direcciones de arte (ejecutar al pie de la letra)

Cada landing tiene **su propio sistema visual**. Dos landings de esta tanda no pueden compartir paleta, par tipográfico, composición de hero ni nombres de clases CSS. `npm run qa:client` falla si la estructura de clases se parece demasiado entre landings consecutivas.

| slug | Dirección | Superficie | Acento (solo CTA) | Tipografías (Google Fonts) | Motivo en SVG/CSS inline |
|------|-----------|-----------|-------------------|----------------------------|--------------------------|
| `sauco-viajes` | Cartel de globo de diálogo | Papel blanco frío `#F6F4F8` | Cobre `#C0522A` | **Anybody** (display, ancho expandido) + **Asap** | Globos de diálogo con cola, lila plano `#6B54A6`, celeste `#7CC3E0`, textura de papel impreso |
| `almendra-viajes-salta` | Cartel de destino | Drenched azul de altura `#0B2E52` | Terracota `#D4622A` | **League Spartan** (display) + **Petrona** | Letras monumentales tipo cartel de pueblo, bandas del Hornocal en SVG (rosa/ocre/jade/piedra), arco de adobe, cardón. Piedra `#EFE6D8`, cobalto `#2E6FA8` |
| `tienda-de-viajes` | Casona platense de damero | Yeso verdoso `#E7ECE1` | Azafrán `#E9A317` | **Prata** (display) + **Alegreya Sans** | Damero como patrón SVG, molduras, avioncito del logo. Tinta `#14294F`, salvia `#5F6E55` |
| `viq-viajes` | Pizarra de salidas a las termas | Drenched verde termal `#0B4A50` | Coral `#FF6A3D` | **Darker Grotesque** (display) + **Epilogue** | Renglones de pizarra con guías punteadas, ondas de agua SVG, arco fino de arcoíris. Panel turquesa `#12656B`, arena `#D9CFBB` |
| `junaza-viajes-y-turismo` | Vidriera empapelada | Granito `#23262A` | Lima `#B9D91E` | **Bungee** (solo display) + **Rubik** | Fichas de folleto en hueso `#F1F0EC` apenas rotadas y superpuestas, tag de marca en SVG, chinches, cinta. Panel `#31363B` |

Los hex son el punto de partida comprometido: se pueden derivar tonos de la misma familia para superficies y bordes, pero **no cambiar la dirección** ni el color del acento.

## Contrato duro de QA (no negociable)

1. Footer con el texto exacto `Creado por Mayofy` enlazado a `https://www.instagram.com/mayofy.web/`.
2. `lang="es-AR"`, `<title>` y meta description con servicio + ciudad. Semántica real (`header`/`main`/`section`/`footer`), un solo `h1`, jerarquía sin saltos.
3. **Palabras prohibidas en el HTML visible**: `IA`, `AI`, `generado/generada`, `landing`, `template`, `placeholder`, `editable`, `demo`, `mock`, `fotos reales`, `sin inventar`, `datos públicos`, `la página`. Tampoco corchetes `[...]` en copy visible.
4. **Máximo 4 rayas largas (—) en todo el texto**: usar `·`, coma o punto. La atribución de reseña va como `Nombre · Google`, no con raya larga.
5. CTA `tel:` arriba del fold y **barra sticky de llamada en mobile**. El CTA de contacto es el elemento visual más caliente de la página.
6. La ficha de contacto (bloque de horario + dirección) **incluye el link "Cómo llegar" a Google Maps junto a la dirección misma**, además del CTA separado si existe.
7. Contraste AA en todo el texto. Nada de gris claro sobre fondo tintado. Cuerpo 16-18px, line-height más holgado sobre fondo oscuro.
8. Motion sobrio: reveals escalonados al cargar + `IntersectionObserver` en scroll. **El contenido es visible por defecto**: el reveal mejora un estado ya visible, nunca lo esconde. `@media (prefers-reduced-motion: reduce)` siempre.
9. Imágenes locales únicamente, con `alt` descriptivo y honesto. `loading="eager"` en el hero, `lazy` en el resto. `onerror` del hero apunta a `./assets/fallback.svg`.
10. Única dependencia externa permitida: Google Fonts. Sin CDN de JS, sin frameworks, sin iconos remotos.

## Anti-slop (el detector `npm run qa:impeccable` corre sobre esto y falla si hay hallazgos)

- Sin degradés violetas ni cian; sin texto de color vivo cian o violeta sobre fondo oscuro; sin glows de color en dark theme.
- Sin `border-left`/`border-right` grueso de color como acento (side-tab).
- Sin `background-clip: text` con degradé.
- Sin chips eyebrow en mayúsculas con tracking amplio arriba de cada sección; sin marcadores `01 / 02 / 03` como andamiaje (los pasos numerados del proceso sí valen, porque son una secuencia real).
- Sin grillas de tarjetas idénticas (ícono + título + párrafo) ni tarjetas anidadas.
- Sin fondo crema/beige salvo que la tabla de arriba lo pida (ninguna lo pide).
- Sin cuerpos de texto en mayúsculas; mayúsculas solo en labels cortos.
- Sin fuentes genéricas: Inter, Roboto, Arial, Helvetica, Open Sans, Lato, Montserrat, system-ui, Space Grotesk, Fraunces, Instrument, Geist, Plus Jakarta, Recoleta.
- Sin `repeating-linear-gradient` de rayas ni grillas de líneas como decoración: los motivos van en SVG inline dibujado.
- Sin texto que se desborde de su contenedor en ningún breakpoint: probar los titulares a 360, 768, 1024 y 1440.
- Spacing con ritmo (agrupaciones apretadas + separaciones generosas), no el mismo valor en todas las secciones.

## Datos verificados por landing

Teléfonos, horarios y direcciones salen del dataset. Los `href` exactos:

| slug | `tel:` | Segundo canal | Horario a mostrar | Query de Maps |
|------|--------|---------------|-------------------|---------------|
| `sauco-viajes` | `tel:+543415982505` (0341 598-2505) | Sin WhatsApp verificado. Segundo CTA: Cómo llegar. Instagram `https://www.instagram.com/saucoviajes/` como link secundario en contacto | Lunes a viernes de 9:30 a 17:30. Sábados y domingos, cerrado | `Sauco Viajes, Av. Carlos Pellegrini 338, Rosario, Santa Fe` |
| `almendra-viajes-salta` | `tel:+543875911711` (0387 591-1711) | WhatsApp `https://wa.me/5493875911711` (mismo número publicado en su Instagram) + `https://www.instagram.com/almendraviajessalta/` | Lunes a sábado de 11 a 22. Domingos, cerrado | `Almendra Viajes Salta, Pje Santa Victoria 715, Salta` |
| `tienda-de-viajes` | `tel:+542214246300` (0221 424-6300) | WhatsApp `https://wa.me/5492213038874` (221 303-8874) + `https://www.instagram.com/tiendadeviajes/` | Lunes a viernes de 9 a 16. Sábados y domingos, cerrado | `Tienda de Viajes, Calle 11 769, La Plata` |
| `viq-viajes` | `tel:+541142540508` (011 4254-0508) | **Sin WhatsApp** (la línea verificada es fija, no hay evidencia pública). Instagram `https://www.instagram.com/viqviajesoficial/` como link secundario | **No hay horario publicado.** La ficha dice: “El horario de atención se confirma por teléfono.” Nunca inventar uno | `Viq Viajes, Av. 12 de Octubre, Quilmes` |
| `junaza-viajes-y-turismo` | `tel:+543814307696` (0381 430-7696) | WhatsApp `https://wa.me/5493815008374` (381 500-8374) + `https://www.instagram.com/junazaviajes/` | Lunes a viernes de 9 a 17. Sábados de 9 a 13. Domingos, cerrado | `Junaza Viajes, San Martín 667, San Miguel de Tucumán` |

Formato del link de Maps, igual que en las corridas anteriores:
`https://www.google.com/maps/search/?api=1&query=<query+urlencodeada>`

Nombre a comunicar: usar `brand_name` cuando existe en el dataset (`Almendra Viajes Salta`, `Junaza Viajes`); en el resto, `name`.

## Reseñas

Citar **literal** desde `data/agencias-viajes-ar-businesses.json`, con el autor. Se puede recortar con puntos suspensivos, nunca reescribir palabras ni corregir la ortografía del autor. Tres reseñas por landing, todas con su nombre. No agregar reseñas, estrellas por reseña ni fechas que el dataset no traiga.

## Prohibido inventar

Precios, cuotas, financiación, cupos, fechas de salida, hoteles, aerolíneas, marcas, años de trayectoria, cantidad de viajes o pasajeros, premios, garantías, certificaciones, destinos que no estén nombrados en las reseñas o en el `service_cards` del spec, y horarios que el dataset no traiga. Donde el spec trae `price_label` (`A consultar`, `Según la salida`, `Se cotiza por grupo`), usarlo tal cual: es una etiqueta de consulta, no un precio.

Los `alt` del hero describen el paisaje o el objeto, **no** afirman que sea una instalación, un grupo o un resultado del negocio. Las fotos de Google Places sí son del negocio y su `alt` puede decirlo.

En `junaza-viajes-y-turismo`: las fotos del local muestran folletos y logos de terceros (aerolíneas, otras operadoras) y una dirección vieja en el cartel. Recortar o encuadrar para no reproducir esas marcas ni esa dirección. La dirección válida es San Martín 667, piso 3, oficina F.

## Estructura comercial mínima por landing

El `commercial` del spec ya trae el contenido: hero claim, trust bar, service cards, why choose, packages, gallery, process y final CTA. Implementarlo completo, pero **cada landing con su propia composición** según `design_brief.layout_signature` (no el mismo orden de secciones en las cinco).

## Validación permitida

```bash
npm run validate:specs -- --businesses data/agencias-viajes-ar-businesses.json --specs data/site-specs/agencias-viajes-ar-site-specs.json
npm run qa:impeccable -- data/frontends/agencias-viajes-ar
```

No correr `generate`, `qa`, `qa:client` ni el estudio final: eso lo corre Claude en la revisión. No commitear.

## Reporte final esperado

Archivos creados por slug, decisiones de implementación que se apartaron del brief y por qué, resultado de `qa:impeccable`, qué quedó sin validar y riesgos. Incluir la lectura de riesgo a nivel implementación: contraste medido en los pares críticos, overflow de titulares por breakpoint, y cualquier dato del dataset que haya quedado sin lugar en la página.
