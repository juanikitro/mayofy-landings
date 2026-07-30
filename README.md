# ia-landing-generator

Base reusable para investigar negocios locales reales, verificar datos con evidencia y generar una landing destacable separada por negocio.

El repositorio empieza sin datos reales finales. `data/tandil-businesses.json` existe como destino del caso Tandil, pero queda vacio hasta cargar negocios verificados desde fuentes permitidas. Los fixtures bajo `data/fixtures/` son mock y nunca deben usarse para deploy final.

## Stack

- TypeScript para scripts, validadores y generador.
- JSON como fuente inicial de datos.
- Frontend escrito por agente por negocio: HTML/CSS propio o framework/librerias cuando aporten calidad.
- Renderer estatico interno solo como fallback de preview.
- Vercel despliega un unico proyecto con catalogo por sesion y URLs publicas por landing.

La prioridad es calidad visual, no velocidad ni costo. El agente tiene libertad para usar frameworks, librerias, composiciones propias y CSS dedicado, siempre que el resultado final exporte archivos estaticos y respete los datos verificados.

Division de roles (preferencia explicita): el diseno lo hace, con la skill **IMPECCABLE** como motor (`frontend-design` como fallback), el agente que corre la sesion — **Claude** cuando orquesta Claude (no lo delega a Codex), o **Codex** cuando la sesion corre en Codex — y **Codex programa** el codigo a partir del brief de diseno (ver `CLAUDE.md`, `AGENTS.md` y `agents/design-director.md`). La barra de calidad son los golden samples de `docs/DESIGN_STANDARDS.md`, reforzada por el detector `npm run qa:impeccable`.
Cada landing debe nacer de un `conversion_template` y un `design_brief`: que vende, tesis visual, voz de copy, firma de layout, plan de assets, plan de IA segura, anti-patrones y objetivos de remake. Si los datos o fotos son pobres, la IA puede poblar copy, secciones e imagenes genericas del rubro sin inventar datos comerciales.

## Comandos

```bash
npm install
npm run validate:mock
npm run generate:mock
npm run qa:mock
```

Cuando existan 10 negocios reales aprobados:

```bash
npm run compose:local -- --input data/<run>-businesses.json --out data/site-specs/<run>-site-specs.json
npm run validate:data -- data/<run>-businesses.json
npm run generate -- data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --session <run>
npm run qa -- --session <run> --expected-count 10
npm run registry:sync
npm run registry:sync -- --check
```

El deploy es automatico en push a `main` via `.github/workflows/deploy-vercel.yml` (ver `docs/DEPLOYMENT.md`); no hay comando local de deploy. Vercel usa un solo proyecto (`ia-landing-generator`) y publica cada landing como `/<run>/<slug>/`.

`npm run registry:sync` actualiza `data/generated-landings.json` y su listado Markdown. Los comandos de busqueda, shortlist y promocion lo consultan por defecto para no repetir un negocio; se puede indicar otro archivo con `--registry <path>`.

Para componer la direccion visual/copy con OpenAI:

```bash
$env:OPENAI_API_KEY="..."
npm run compose:ai -- --input data/<run>-businesses.json --out data/site-specs/<run>-site-specs.json
```

El flujo recomendado es agent-first, no API-first:

```bash
npm run agent:briefs -- --input data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --out data/agent-briefs/<run> --city "<Ciudad>" --segment "<Rubro>"
# Claude escribe conversion_template + design_brief en data/site-specs/<run>-site-specs.json
# Codex crea data/frontends/<run>/<slug>/ a partir de ese brief
npm run validate:specs -- --businesses data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json
npm run generate:preview -- data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --session <run>
npm run generate -- data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --session <run>
npm run qa -- --session <run> --expected-count 10
npm run qa:client -- --session <run>
npm run qa:impeccable -- generated/<run>
npm run study:final -- --session <run> --businesses data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --briefs data/agent-briefs/<run> --price "[PRECIO]"
```

`compose:ai` queda como opcion secundaria para quien quiera usar billing de OpenAI API. `npm run generate` exige fotos reales descargadas desde Google Places y frontends escritos por agente. Para revisar datos/UI sin bloquear por fotos o frontends finales, usar `npm run generate:preview`.

`npm run qa` valida integridad tecnica. `npm run qa:client` es el gate de entrega: falla si la tanda todavia parece demo interna, template repetido, copy con placeholders visibles o landing no vendible. `npm run qa:impeccable` corre el detector determinístico de IMPECCABLE (anti-slop: side-tab, dark-glow, gradiente violeta, eyebrow chips, bajo contraste, etc.) sobre las landings generadas y falla ante hallazgos; es una capa adicional a los gates anteriores. Excepciones (golden samples de `amba-alta-conversion`) y config en `.impeccable/config.json`. En un clon nuevo, materializar la skill con `npm run impeccable:install`.

Para navegar todas las tandas generadas localmente, ejecutar `npm run browse` y abrir `http://localhost:4310`.

Para rehacer una tanda floja:

```bash
npm run agent:briefs -- --input data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --out data/agent-briefs/<run> --city "<Ciudad>" --segment "<Rubro>" --remake-from generated/<run> --screenshots output/screenshots/<run>
```

El brief de remake incluye contexto de la version anterior y obliga a reemplazar la estructura si no llega a barra de producto real.

`npm run study:final -- --price "[PRECIO]"` escribe `generated/<sesion>/final-study.md` y `generated/<sesion>/final-study.json` junto a las landings, con todos los contactos encontrados como links, lead score, mini auditoria comercial y un paquete de outreach con mensaje inicial personalizado, follow-ups y objeciones por negocio. El precio no se inventa: pasalo por `--price` o quedara como placeholder para las respuestas a objeciones.

## Busqueda automatica de candidatos

Con Google Places API:

```bash
$env:GOOGLE_PLACES_API_KEY="..."
npm run search -- --city "<Ciudad>" --country Argentina --segment "<Rubro>" --out data/intake/<run>-candidates.json --limit 30
npm run validate:intake -- data/intake/<run>-candidates.json
```

Esto genera `data/intake/<run>-candidates.json` con candidatos no aprobados. Sirve para acelerar investigacion, no para deploy directo.

Shortlist automatico y promocion al dataset final:

```bash
npm run shortlist -- --input data/intake/<run>-candidates.json --out data/intake/<run>-shortlist.json --limit 10
npm run promote -- --input data/intake/<run>-shortlist.json --out data/<run>-businesses.json --limit 10
npm run compose:local -- --input data/<run>-businesses.json --out data/site-specs/<run>-site-specs.json
npm run validate:data -- data/<run>-businesses.json
npm run generate -- data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --session <run>
npm run qa -- --session <run> --expected-count 10
```

## Flujo

1. Buscar candidatos reales con `npm run search -- --city "<Ciudad>" --out data/intake/<run>-candidates.json`; los negocios del registro se saltean antes de pedir detalles a Google Places.
2. Generar shortlist con `npm run shortlist -- --input data/intake/<run>-candidates.json --out data/intake/<run>-shortlist.json`; el reporte deja constancia de los descartados que ya tienen landing.
3. Promover 10 negocios con `npm run promote -- --input data/intake/<run>-shortlist.json --out data/<run>-businesses.json --limit 10`; el comando bloquea una promocion repetida salvo `--allow-generated`.
4. Preparar briefs con `npm run agent:briefs -- --input data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --out data/agent-briefs/<run> --city "<Ciudad>" --segment "<Rubro>"`.
5. Etapa `design-director` (el agente de la sesión — Claude, o Codex si corre en Codex — con la skill IMPECCABLE `shape`/`critique`, register `brand`): elige `conversion_template`, completa `design_brief` con `designed_by: "claude-code" o "codex"` y define la dirección visual de cada landing; Codex implementa el frontend a partir de ese brief.
6. El agente agrega `agent_frontend` en `data/site-specs/<run>-site-specs.json`.
7. Validar specs con `npm run validate:specs -- --businesses data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json` y el gate de diseño con `npm run qa:design -- --businesses data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json`.
8. Validar que no haya datos inventados ni negocios con sitio propio.
9. Generar una carpeta de sesion en `generated/<sesion>/`; adentro queda una carpeta por negocio (`generated/<sesion>/<slug>/`) con todo su codigo y se actualiza el registro versionado.
10. Ejecutar QA de contenido, datos y frontends authored.
11. Ejecutar `npm run qa:client`, `npm run qa:impeccable -- generated/<run>` (detector anti-slop) y revisar screenshots desktop/mobile.
12. Generar el estudio final con `npm run study:final -- --session <run> --businesses data/<run>-businesses.json --price "[PRECIO]"`; el Markdown queda en `generated/<sesion>/final-study.md`.
13. El workflow de deploy publica un unico proyecto Vercel con catalogo interno y URLs separadas por landing.

`generated/` es salida reproducible local/CI y no debe versionarse. Las fuentes versionadas son datasets, specs, `data/frontends/**` y el registro durable `data/generated-landings.{json,md}`.

Ver detalles en `docs/PIPELINE.md`, `docs/DATA_RULES.md`, `docs/DESIGN_STANDARDS.md`, `docs/CLIENT_READINESS_QA.md` y `docs/DEPLOYMENT.md`.
