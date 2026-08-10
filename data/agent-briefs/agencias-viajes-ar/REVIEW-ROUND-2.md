# Ronda 2 · correcciones sobre la entrega de `agencias-viajes-ar`

Revisión hecha por Claude sobre el output de la ronda 1, con screenshots (`output/screenshots/agencias-viajes-ar-v1/`), el detector de IMPECCABLE (69 hallazgos) y `npm run qa:client` (NOT_READY, 90/100).

Lo que está bien y no hay que tocar: contrato de datos, footer, `lang`, semántica, reseñas literales con autor, Maps dentro de la ficha de contacto, barra sticky mobile, cero palabras prohibidas, cero corchetes, cero rayas largas de más, motion con `prefers-reduced-motion`.

Lo que hay que corregir está abajo, ordenado por gravedad. **P1 es el bloqueante de calidad**: hoy las cinco landings son la misma plantilla renombrada.

---

## P1 · Las cinco comparten copy de andamiaje y estructura

Las cinco páginas usan **los mismos títulos de sección, palabra por palabra**: "Elegí por dónde empezar", "Una mirada desde su propia historia", "Lo dicen quienes ya viajaron", "El viaje se define con vos", "De la consulta al viaje", "Palabras de quienes volvieron", "Hablemos del próximo viaje". Los eyebrows también: "Opciones para mirar", "Postales de la agencia", "Por qué los eligen", "Para conversar", "Así se mueve", "Reseñas en Google", "Contacto directo". Las clases están prefijadas por landing, pero eso solo esconde el problema: el visitante ve la misma página cinco veces.

1. **Usar el copy del spec**, que ya está escrito por landing en `data/site-specs/agencias-viajes-ar-site-specs.json`:
   - `review_heading` para el título de la sección de reseñas (hoy dice "Palabras de quienes volvieron" en las cinco).
   - `contact_heading` para el título de la sección de contacto (hoy "Hablemos del próximo viaje" en las cinco).
   - `subheadline` **falta por completo** y es donde vive la prueba verificada (horario, dirección, cómo acompañan). Va en el hero, debajo del `h1`.
   - `resource_title` + `resource_items` **faltan por completo**. Son un bloque real de decisión ("Antes de sumarte al grupo", "Lo que se pregunta por teléfono"...). Agregarlo.
   - `commercial.hero_claim`, `service_cards`, `why_choose`, `packages`, `process`, `final_cta`: ya están usados, mantener.
2. **Los títulos que no salen del spec se escriben distintos en cada landing**, con la voz de `design_brief.copy_voice`. Nada de una frase compartida entre dos landings.
3. **Eliminar los eyebrows repetidos** (`*-label` arriba de cada sección: 8 por página). El detector los cuenta como andamiaje de IA y el brief los prohíbe explícitamente. Reemplazar la cadencia de sección por algo propio de cada dirección de arte: una regla horizontal, un cambio brusco de escala tipográfica, una franja de color, la cola de un globo, una banda estratificada, una guía punteada, una lengüeta de papel.

## P2 · Las direcciones de arte están en la paleta, no en la estructura

Hoy el motivo de cada dirección aparece solo como un SVG chico en el hero y el resto es la misma grilla de tarjetas rectangulares. El motivo tiene que **estructurar la página**:

- `sauco-viajes`: el globo de diálogo es el contenedor, no un adorno. Las reseñas, el claim del hero y los títulos viven dentro de globos con cola, en tamaños distintos y con rotaciones mínimas (±1,5°). Papel impreso, no tarjetas.
- `almendra-viajes-salta`: cada excursión es un **cartel de destino**: el nombre del lugar en League Spartan gigante, tratado como letra fundida, con la foto verificada al lado. Las bandas del Hornocal son el separador entre secciones, a lo ancho. Hoy es una grilla de cinco tarjetas iguales.
- `tienda-de-viajes`: hero partido de verdad (tipografía a la izquierda, foto a la derecha), el damero como separador de sección y zócalo del footer, y el bloque de diagnóstico en dos columnas asimétricas.
- `viq-viajes`: el bloque de salidas es una **pizarra**: destino a la izquierda, guía punteada, dato a la derecha, en renglones tabulares. Hoy son tarjetas. Ondas de agua en SVG detrás de la ficha de contacto.
- `junaza-viajes-y-turismo`: fichas de folleto **superpuestas y rotadas**, con lengüeta de papel y chinche. Bungee solo en la palabra del hero. El tag de la marca como marca de sección.

Densidad de referencia: los golden samples de `data/frontends/amba-alta-conversion/` tienen 14-17 KB de HTML y 18-25 KB de CSS por landing. La ronda 1 quedó en 8,4 KB y 8,7 KB, con el mismo CSS de base en las cinco.

## P3 · Contraste: 41 hallazgos de `low-contrast`

Los acentos se usaron como color de texto y no llegan a AA. Los acentos son **rellenos**; cuando el acento tiene que ser texto, va una variante corregida. Tokens exactos:

| landing | Texto de acento | CTA (relleno + texto) | Otro arreglo |
|---------|-----------------|------------------------|--------------|
| `sauco-viajes` | `#A8431F` sobre `#F6F4F8` | relleno `#A8431F`, texto `#FFFFFF` | eliminar todo texto `#FFFFFF` sobre `#F6F4F8` (hoy hay 2, se leen invisibles) |
| `almendra-viajes-salta` | `#F0A06A` sobre `#0B2E52` | relleno `#D4622A`, texto `#101010` | el panel cobalto `#2E6FA8` no soporta texto piedra: usar `#154A7C` cuando lleve texto `#EFE6D8` (8 hallazgos) |
| `tienda-de-viajes` | `#8A5A05` sobre `#E7ECE1` | relleno `#E9A317`, texto `#14294F` | eliminar texto `#FFFFFF` sobre `#E7ECE1` (hoy hay 2) |
| `viq-viajes` | `#FF9A6E` sobre `#0B4A50` | relleno `#FF6A3D`, texto `#101010` | 7 hallazgos con `#FF6A3D` como texto |
| `junaza-viajes-y-turismo` | lima `#B9D91E` ya pasa (11:1) | mantener | sin cambios de color |

## P4 · Otros hallazgos del detector

- `numbered-section-markers` (5 hallazgos): sacar los `<b>01</b>…<b>04</b>` de las tarjetas de servicios y de ofertas. Los números **solo** quedan en los pasos del proceso, que sí son una secuencia real.
- `tight-leading` (13 hallazgos): ningún elemento con más de 50 caracteres de texto puede tener `line-height` menor a 1,3. Cuerpo a 1,5-1,65. Los titulares (h1-h6) están exentos y pueden quedar ajustados.
- `cramped-padding` (10 hallazgos): `tie-why`, `tie-route`, `viq-why`, `viq-route` y las demás que marque el detector necesitan al menos 16px de inset donde los hijos quedan pegados al borde del contenedor con fondo o borde visible.

## P5 · Bloqueante de `qa:client`: `service_signal`

`sauco-viajes`, `almendra-viajes-salta`, `tienda-de-viajes` y `junaza-viajes-y-turismo` fallan porque el validador busca la palabra `servicio`/`servicios` en el copy visible y no está. `viq-viajes` pasa porque sus reseñas la traen. Agregarla de forma natural y honesta (por ejemplo, como título del bloque de lo que hace la agencia: "Los servicios que arma la agencia"). No forzarla en un lugar donde suene raro.

## P6 · Teléfonos en formato internacional

Los `href` quedaron como `tel:03415982505`. Usar los de la tabla del handoff, que son los que funcionan desde un celular con el prefijo del país:

`tel:+543415982505` · `tel:+543875911711` · `tel:+542214246300` · `tel:+541142540508` · `tel:+543814307696`

## P7 · Bug del pipeline: `generate` sobrescribe el hero editorial

`npm run generate` copia el frontend del agente y **después** corre `prepareHeroImage`, que escribe `assets/hero.<ext>` con la primera foto de Google Places. Resultado: en las cinco landings generadas el hero editorial se reemplazó por la foto de Places (`generated/agencias-viajes-ar/sauco-viajes/assets/hero.jpg` pesa exactamente lo mismo que `foto-1.jpg`), justo lo que `docs/DATA_RULES.md` prohíbe. Dos cambios:

1. En las cinco landings, renombrar el asset editorial de `assets/hero.jpg` a `assets/portada.jpg` y actualizar `src` y el `onerror`. Así la corrida queda correcta incluso sin tocar el generador.
2. En `src/generator/image-assets.ts`, en `prepareHeroImage`, agregar una guarda: si el directorio del sitio ya trae un `assets/hero.*` provisto por el frontend del agente, **no descargar ni sobrescribir**; devolver ese archivo como `heroSrc`. Diff mínimo, sin refactor, sin cambiar el comportamiento cuando no hay frontend de agente. Es un arreglo que afecta a todas las corridas futuras: mantenerlo conservador y explicar el riesgo en el reporte.

## Validación de salida

```bash
npm run qa:impeccable -- data/frontends/agencias-viajes-ar
```

Tiene que terminar en **0 hallazgos**. Si algún hallazgo es una decisión de arte defendible, dejarlo escrito en el reporte en vez de silenciarlo en `.impeccable/config.json`.

`validate:specs` y `qa:impeccable` fallaron en la ronda 1 por `spawn EPERM` de esbuild en el sandbox. Si vuelve a pasar, decirlo en el reporte y no darlo por aprobado; Claude corre `generate`, `qa`, `qa:client` y el estudio final.

No commitear. No tocar los datos ni el `design_brief`: el diseño está aprobado, lo que cambia es la ejecución.
