# Deployment

El deploy a Vercel es automatico. No hay comando local que publique produccion.

## Modelo

El repo despliega un solo proyecto Vercel. El nombre del proyecto lo fija la variable de repo `VERCEL_PROJECT_NAME` (Settings > Secrets and variables > Actions > Variables); si no está seteada, cae al `name` de `package.json`. Proyecto actual: `mayofy-landings` (https://mayofy-landings.vercel.app). No se crea un proyecto por landing.

El sitio publicado contiene:

- `/` - login hardcodeado simple para el catalogo.
- `/catalog/` - catalogo de sesiones.
- `/catalog/<run>/` - landings de una sesion.
- `/catalog/<run>/<slug>/estudio/` - estudio comercial de una landing.
- `/<run>/<slug>/` - URL publica directa para enviar al negocio.

El login solo protege la navegacion del catalogo en cliente. No es autenticacion real: las landings directas son publicas.

Credenciales hardcodeadas del catalogo:

- usuario: `juani`
- clave: `landings`

## Disparadores

`.github/workflows/deploy-vercel.yml` corre:

- En cada push a `main` que modifique datos, specs, frontends o scripts de deploy.
- Manualmente via `workflow_dispatch`. Si `run` queda vacio, despliega todas las tandas deployables. Si se pasa `run`, despliega solo esa tanda.

En pushes normales, si detecta un cambio deployable, el workflow regenera todas las tandas deployables para que el proyecto unico mantenga el catalogo completo.

## Que hace el workflow

1. `scripts/detect-deploy-runs.mjs` decide si hay tandas deployables.
2. `scripts/generate-deploy-runs.mjs` corre por tanda:
   - `validate-design-gate`
   - `generate-sites` con fotos reales, frontends de agente y design brief requerido
   - `validate-generated-sites`
   - `validate-client-readiness` en modo warning para que una tanda historica no bloquee el catalogo completo
   - `create-final-study` para que el catalogo tenga una pagina de estudio por landing
3. `scripts/build-vercel-catalog.mjs` arma `dist/vercel-catalog/` con el login, catalogo y landings publicas.
4. `scripts/deploy-generated.mjs` vincula/despliega `dist/vercel-catalog/` al proyecto Vercel unico.

Si falla el gate tecnico, no se publica el catalogo. Si falla `qa:client`, el deploy continua y el log marca que esa landing no deberia venderse sin correccion.

## Secrets requeridos

- `VERCEL_TOKEN`
- `GOOGLE_PLACES_API_KEY`
- `VERCEL_SCOPE` opcional si se despliega dentro de un team/org.

`VERCEL_PROJECT_NAME` esta seteada como variable de repo (no secret, no es sensible) en `mayofy-landings`. Si no existe el proyecto, el script intenta crearlo.

## `generated/`

`generated/` es salida reproducible de `npm run generate` y del workflow. No debe versionarse.

Las fuentes versionadas son:

- `data/*-businesses.json`
- `data/site-specs/*.json`
- `data/frontends/**`
- scripts y docs del pipeline

Para revisar localmente:

```bash
npm run generate -- data/<run>-businesses.json --specs data/site-specs/<run>-site-specs.json --session <run>
npm run browse
```

Para armar el bundle estatico local desde las tandas ya generadas:

```bash
npm run catalog:build -- --runs '["<run>"]'
```
