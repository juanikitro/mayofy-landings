# Pipeline

## Fase 1: repo base

Estructura, schema, validadores, generador, arquetipos, agentes, skills y docs iniciales.

## Fase 2: dataset schema

`data/<run>-businesses.json` debe contener solo negocios reales. El archivo puede estar vacio mientras no haya datos verificados.

Validacion:

```bash
npm run validate:data -- data/<run>-businesses.json
```

Este comando exige exactamente 10 negocios aprobados y rechaza mocks.

## Fase 3: investigacion e importacion

Fuentes permitidas:

- API oficial.
- Export del usuario.
- Busqueda autorizada.
- Carga manual asistida.
- URLs publicas verificables.

Importar un export JSON ya verificado:

```bash
npm run import:businesses -- --input verified-export.json --output data/<run>-businesses.json
```

No se incluye scraping agresivo ni scraping que viole terminos de servicio.

### Busqueda automatica con Google Places

Configurar una API key en la shell:

```bash
$env:GOOGLE_PLACES_API_KEY="..."
```

Buscar candidatos para una ciudad/rubro:

```bash
npm run search -- --city "<Ciudad>" --country Argentina --segment "<Rubro>" --out data/intake/<run>-candidates.json --limit 30
npm run validate:intake -- data/intake/<run>-candidates.json
```

El resultado se guarda en `data/intake/<run>-candidates.json`.

Esta salida no aprueba negocios para deploy. Marca `approved_for_generation: false`. Por configuracion local, las fotos de Google Places se cargan como `allowed` por defecto. Los candidatos con `websiteUri` informado por Google Places se descartan automaticamente.

### Enriquecimiento de fotos con Instagram

Despues de la busqueda de Places, el agente realiza research publico de Instagram. Solo puede asociar un perfil si la coincidencia con el negocio queda verificada por nombre y ciudad, direccion, telefono o un enlace desde otra fuente publica. El resultado se guarda en un manifest auditable:

```json
{
  "businesses": [
    {
      "slug": "nombre-del-negocio",
      "profile_url": "https://www.instagram.com/nombre_del_negocio/",
      "match_evidence": [
        { "source_url": "https://www.google.com/maps/...", "note": "Mismo nombre y telefono publicado." }
      ],
      "photos": [
        {
          "media_url": "https://cdn.example.com/foto.jpg",
          "source_url": "https://www.instagram.com/p/post-verificado/",
          "type": "product"
        }
      ]
    }
  ]
}
```

Luego ejecutar:

```powershell
npm run research:instagram -- --input data/intake/<run>-candidates.json --research data/intake/<run>-instagram-research.json --out data/intake/<run>-instagram-candidates.json --assets-dir data/intake/<run>-assets
```

El comando descarga hasta tres fotos por negocio y las antepone a las de Google Places. Si un perfil es ambiguo o una descarga falla, conserva el candidato sin cambios y Places queda como fallback. No se agrega scraping automatizado ni URLs temporales de CDN al dataset final.

Crear shortlist automatico:

```bash
npm run shortlist -- --input data/intake/<run>-candidates.json --out data/intake/<run>-shortlist.json --limit 10
```

El comando escribe:

- `data/intake/<run>-shortlist.json`
- `data/intake/<run>-shortlist.report.md`

Promover los 10 negocios al dataset final:

```bash
npm run promote -- --input data/intake/<run>-shortlist.json --out data/<run>-businesses.json --limit 10
npm run validate:data -- data/<run>-businesses.json
```

Componer direccion visual y preparar el trabajo del agente:

```bash
npm run agent:briefs -- --input data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --out data/agent-briefs/<run> --city "<Ciudad>" --segment "<Rubro>"
```

Luego los agentes (el diseño con la skill **IMPECCABLE** lo hace el agente de la sesión — Claude, o Codex si corre en Codex —, y Codex implementa el código) deben:

- disenar una landing real por negocio (etapa `design-director`, flujo IMPECCABLE `shape`/`critique`, register `brand`; ver `agents/design-director.md`)
- elegir un `conversion_template` de alta conversion: promesa + prueba + CTA, historia local editorial, menu visual, diagnostico de servicio, mostrador/catalogo o llamada urgente
- escribir un `design_brief` con tesis visual, voz de copy, firma de layout, plan de assets, plan de IA segura, anti-patrones y objetivos de remake
- trabajar desde una estructura comercial completa: hero fuerte, trust bar, servicios, razones para elegir, opciones de consulta, antes/despues o galeria, proceso, resenas/contacto y CTA final
- usar datos reales cuando existan y completar la pagina con copy, secciones e imagenes genericas seguras generadas por IA cuando los datos/fotos sean pobres
- crear HTML/CSS propio o un framework/libreria de UI, animaciones o iconos exportado a estatico
- guardar el resultado dentro de `data/frontends/<run>/<slug>/`
- agregar `agent_frontend` en `data/site-specs/<run>-site-specs.json`

Validar:

```bash
npm run validate:specs -- --businesses data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json
```

`npm run compose:local` queda como fallback mecanico, pero tambien genera `conversion_template`, `design_brief`, `commercial` y `creative`. `npm run compose:ai` queda como opcion secundaria con billing de OpenAI API; no usa tokens de Codex Desktop.

El generador usa `data/site-specs/<run>-site-specs.json` para validar datos, ubicar el frontend de agente y copiar el artefacto final. El renderer interno solo queda como fallback de preview.

### Rehacer una tanda floja

Si una tanda ya existe pero parece template, generar briefs de remake con el output y screenshots actuales:

```bash
npm run agent:briefs -- --input data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --out data/agent-briefs/<run> --city "<Ciudad>" --segment "<Rubro>" --remake-from generated/<run> --screenshots output/screenshots/<run>
```

Cada brief incluye excerpts de HTML/CSS y rutas de screenshots si existen. El agente debe criticar la pagina actual, elegir un `conversion_template`, completar `design_brief`, y reemplazar el frontend cuando la estructura anterior sea debil.

Variables opcionales:

```bash
$env:LOCAL_WEB_SEARCH_MIN_RATING="4.3"
$env:LOCAL_WEB_SEARCH_MIN_REVIEWS="10"
```

## Registro de landings generadas

`data/generated-landings.json` es la fuente versionada para saber qué negocios ya tienen landing; `data/generated-landings.md` es su listado legible. El registro se construye desde los datasets aprobados, los site specs y los manifests disponibles, por lo que no depende solo de `generated/`, que no se versiona.

```bash
npm run registry:sync
npm run registry:sync -- --check
```

La busqueda y el shortlist consultan el registro por defecto y se puede cambiar con `--registry <path>`. Para incluir a propósito negocios ya registrados, pasar `--include-generated`; `promote` mantiene un bloqueo duro y requiere `--allow-generated` para forzar la promocion. Luego `generate` actualiza por merge las entradas de la tanda y conserva su primera fecha de generacion. Usar esos escapes solo al rehacer una landing conocida.

`registry:sync --check` sirve para CI: falla si el JSON o el listado Markdown quedaron desactualizados. Cuando un manifest no existe en el entorno, el registro conserva una entrada previamente marcada como `generated` en lugar de perder la evidencia por la ausencia del artefacto ignorado.

## Fase 4: frontend de agente

El agente tiene libertad para crear una UI destacable. Puede usar:

- HTML/CSS estatico dedicado por negocio.
- Frameworks o librerias cuando aporten calidad real.
- Librerias de frontend, animacion e iconos con bastante libertad si elevan el producto final, por ejemplo Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react o React Icons.
- Builds/export estaticos como salida final.

Ejemplo para una landing escrita a mano:

```json
{
  "agent_frontend": {
    "mode": "static-files",
    "source_dir": "data/frontends/<run>/<slug>",
    "notes": "Landing editorial de taller basada en reseñas de viaje."
  }
}
```

Ejemplo con framework:

```json
{
  "agent_frontend": {
    "mode": "framework-build",
    "source_dir": "data/frontends/chivilcoy-ropa/la-tienda",
    "output_dir": "data/frontends/chivilcoy-ropa/la-tienda/dist",
    "build_command": "npm run build",
    "libraries": ["vite", "shadcn/ui", "magicui", "framer-motion", "lucide-react"],
    "notes": "Vidriera editorial con motion y composicion propia."
  }
}
```

El generador no ejecuta `build_command`. El agente debe correr el build y dejar listo `output_dir`.

## Fase 5: generacion

Probar con fixture mock:

```bash
npm run validate:mock
npm run generate:mock
```

Generar final:

```bash
npm run generate -- data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --session <run>
```

Cada corrida crea una carpeta de sesion dentro de `generated/`. El nombre puede salir del dataset explicito (`data/<run>-businesses.json` -> `generated/<run>`) o fijarse con `--session <slug>`. Si se pasa `--city "<Ciudad>"` al generar y no se pasa `--session`, `--run`, `--out` ni salida posicional, la carpeta se nombra automaticamente como `<ciudad>-<fecha>`; sin `--city`, sigue el comportamiento anterior.

`generated/` es un artefacto reproducible local/CI y no se versiona. Para reconstruirlo se usan los datasets, specs y `data/frontends/**`.

Dentro de `generated/<sesion>/` queda una carpeta por negocio (`<slug>/`) con `index.html`, `styles.css` y `site.json`, mas `manifest.json` e `index.html` de indice de la tanda.

Para navegar todas las tandas generadas localmente, ejecutar `npm run browse` y abrir `http://localhost:4310`.

`npm run generate` exige `GOOGLE_PLACES_API_KEY`, fotos reales y `agent_frontend`. Si queres revisar UI sin fotos reales o sin frontend final, usar:

```bash
npm run generate:preview -- data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --session <run>
```

## Fase 6: QA

```bash
npm run qa -- --session <run> --expected-count <N>
npm run qa:client -- --session <run>
npm run qa:impeccable -- generated/<run>
```

`npm run qa` controla cantidad de sitios, footer, texto prohibido, datos cruzados, frontends de agente y carpetas separadas.

`npm run qa:impeccable` corre el detector determinístico de IMPECCABLE (46 reglas anti-slop y de calidad: side-tab, dark-glow, gradiente violeta, eyebrow chips, bajo contraste, etc.) sobre las landings generadas y falla si quedan hallazgos. Es una capa **adicional** a `qa`/`qa:client`, no un reemplazo. Sin argumento scanea `generated/`; se le puede pasar un `generated/<run>` o `data/frontends/<run>` puntual. Excepciones (los golden samples de `amba-alta-conversion`) y configuración en `.impeccable/config.json`. La skill se materializa en un clon nuevo con `npm run impeccable:install`.

`npm run qa:client` es mas estricto y responde otra pregunta: si la landing esta para mostrarsela a un cliente potencial. Falla por senales como:

- copy interno visible (`landing`, `template`, `editable`, `demo`, `la pagina`, `sin inventar`)
- placeholders demasiado crudos
- falta de `conversion_template` o `design_brief`
- falta de plan de IA para poblar copy e imagenes genericas seguras cuando los datos/fotos son pobres
- falta de estructura comercial
- CTAs debiles
- accesibilidad basica floja
- demasiada similitud visual/estructural entre landings consecutivas

El comando escribe `generated/<sesion>/client-readiness-report.md` salvo que se pase `--report`. Aunque pase, la revision visual con screenshots sigue siendo responsabilidad del agente antes de deploy.

## Fase 7: estudio final

Despues de `qa:client` y revision visual, generar una entrega comercial:

```bash
npm run study:final -- --price "[PRECIO]"
```

El comando escribe:

- `generated/<sesion>/final-study.md`
- `generated/<sesion>/final-study.json`

El estudio final cruza `generated/<sesion>/manifest.json`, el dataset de negocios, los site specs y los briefs de la corrida. Para cada negocio entrega:

- link/path de la landing
- todos los contactos encontrados como links (WhatsApp mediante `wa.me`)
- razon y confianza de la prioridad interna elegida para el lead score
- lead score con prioridad, probabilidad de contacto, oportunidad, motivos y riesgos
- mini auditoria comercial con problema que resuelve, señales publicas, datos a pedirle al dueño y mejoras vendibles
- paquete de outreach con mensaje inicial personalizado a partir de una señal pública concreta, follow-ups de 24 y 48 horas y objeciones

El reporte tambien incluye un resumen ejecutivo con top 3 para contactar primero, contactos mas fuertes, mejores oportunidades, negocios que requieren validar canal y desglose de canales.

No buscar redes nuevas ni inventar canales. Si no hay Instagram/WhatsApp verificado, usar el telefono publicado como fallback seguro.

## Fase 8: deploy

El deploy es automatico: `.github/workflows/deploy-vercel.yml` corre en cada push a `main` que toque datos, specs, frontends o scripts de deploy, valida (`qa:design`, `generate`, `qa`), registra `qa:client` y `qa:impeccable` como warning para tandas historicas (paso `continue-on-error`, no bloquea el deploy mientras haya slop historico sin saldar), arma `dist/vercel-catalog/` y publica un unico proyecto Vercel con `scripts/deploy-generated.mjs`. Ver `docs/DEPLOYMENT.md`. No hay paso manual local para produccion.

Rutas publicadas:

- `/` login hardcodeado del catalogo.
- `/catalog/` catalogo por sesion.
- `/<run>/<slug>/` landing publica para enviar al negocio.

## Repetir con otra ciudad

1. Crear `data/<ciudad>-businesses.json`.
2. Cargar negocios con la misma estructura.
3. Ejecutar `tsx src/validators/validate-dataset.ts data/<ciudad>-businesses.json --strict-final`.
4. Ejecutar `tsx src/generator/generate-sites.ts data/<ciudad>-businesses.json --session <ciudad>`.
5. Ejecutar `tsx src/validators/validate-generated-sites.ts --session <ciudad>`.
