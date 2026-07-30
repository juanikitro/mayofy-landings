# Data Rules

## Regla central

No inventar informacion. Si un dato no se puede verificar, usar `null`, explicar el motivo en `missing_data_reason` y no aprobar el negocio para generacion final.

En copy comercial si puede haber placeholders de ejemplo, pero deben verse como placeholders editables y no como hechos. Correcto: `[X] vehiculos atendidos`, `[Precio editable]`, `Opiniones reales proximamente`, `Marca a confirmar`. Incorrecto: publicar "1500 vehiculos atendidos", "10 anos de experiencia", marcas, garantias, stock o precios sin evidencia.

## Evidencia por dato

Cada negocio debe incluir `verification.field_evidence` para los campos principales:

- `name`
- `address`
- `rating`
- `reviews`
- `photos`
- `website_check`
- `main_product_or_service`
- `category`

Si existen telefono u horario, tambien deben tener evidencia.

## Nombre de marca para comunicar

`name` conserva el texto exacto de la fuente (por ejemplo, el `displayName` de Google Places). Si ese texto agrega rubro, servicios u otro ruido que no forma parte de la marca, agregar `brand_name` con el nombre comercial limpio. Las landings, briefs y mensajes de outreach usan `brand_name`; la evidencia y trazabilidad siguen usando `name`.

No inferir esta limpieza con una regla automática: confirmar el nombre comercial con fuentes públicas antes de cargarlo.

## Fotos

Cada foto debe guardar:

- URL de origen.
- Tipo de imagen.
- URL fuente.
- Fecha de captura si esta disponible.
- Estado de permiso.

Solo `usage_status: "allowed"` puede usarse para generar un sitio final.

Por decision local del proyecto, las fotos encontradas por Google Places se cargan como `allowed` por defecto y el paso manual de permiso queda omitido.

Para demos, las fotos de un perfil publico de Instagram previamente verificado tambien se cargan como `allowed`. El research debe conservar la URL del perfil, las URLs de los posts seleccionados y evidencia de que el perfil corresponde al negocio. Durante el enrichment esas fotos se descargan como archivos locales; no usar URLs temporales del CDN de Instagram en el sitio final.

El HTML final no apunta directo al endpoint de Google Places. Durante `npm run generate`, la foto se descarga como asset local si hay `GOOGLE_PLACES_API_KEY`; si no, se usa una imagen SVG local de fallback.

Las fotos ya versionadas en el repo pueden referenciarse por ruta local relativa al repo y el generador las copia como asset del sitio.

## Imágenes editoriales para hero

**El hero SIEMPRE usa una imagen de stock o generada con IA, nunca la foto de Google Places como imagen principal.** Las fotos de Places suelen ser flojas (mala luz, encuadre, resolución) y bajan la calidad de la landing; se usan para extraer identidad/dirección de arte y como contexto documental en secciones internas, no como hero. El hero es un asset local editorial (stock o IA) elegido para ser memorable y vender el rubro.

Ese asset editorial es decorativo, no evidencia del negocio: no reemplaza fotos verificadas para datos. Para ítems/productos destacados (platos, etc.) aplica la sección anterior: imagen apetitosa sin disclaimer. Para lugar/instalaciones el límite se mantiene: la imagen no puede presentar un local, salón, instalación, personal ni resultados ajenos como si fueran del negocio; si el rubro es un espacio físico específico (ej.: salón de eventos), el hero de stock/IA debe ser atmosférico (clima del evento, montaje, luces) y su `alt` no debe afirmar que es ese local puntual. La referencia de identidad (paleta, motivos) sigue saliendo de las fotos permitidas del negocio.

## Imágenes de ítems/productos destacados

Cuando las reseñas verificadas o la oferta real del rubro destacan un ítem concreto (ej.: empanadas fritas, entraña, chinchulines, sándwich de lomito, un plato o producto que valga la pena mostrar), la landing puede usar imágenes de stock o generadas con IA de ese ítem **sin aclarar visualmente que no son fotos del local**. No hay que esperar a que el negocio tenga esa foto propia en Google Places o Instagram: el ítem está genuinamente respaldado por la evidencia, así que la imagen apetitosa funciona como serving suggestion y no engaña sobre lo que el negocio ofrece.

Límites que se mantienen:

- Solo aplica a imágenes de **producto/ítem/plato** respaldados por reseñas o por la oferta verificada del rubro. No habilita mostrar instalaciones, salón, personal, autos ni resultados ajenos como si fueran del local (eso sigue rigiéndose por la sección de hero editorial: alt/caption honestos).
- No habilita inventar hechos comerciales: precios, stock, marcas, años, premios, garantías, servicios no verificados ni reseñas falsas siguen prohibidos.
- El `alt` describe el ítem con naturalidad comercial; no hace falta el disclaimer "imagen ilustrativa", pero tampoco se afirma que sea una foto tomada en el local.

## Resenas de Google Places

Las resenas obtenidas por Places API deben conservar texto y atribucion. Antes de mostrarlas publicamente, verificar las politicas vigentes de Google Maps Platform para author attribution y orden de resenas.

## Ausencia de sitio web propio

`has_own_website` solo puede ser `false` si `website_check` contiene fuentes revisadas y evidencia. No alcanza con no conocer un dominio.

## Mocks

Los mocks deben llevar `is_mock: true` y fuentes `mock://`. Los comandos finales los rechazan.

Los mocks pueden incluir datos comerciales de ejemplo para probar estructura visual, siempre marcados como mock o editable. No deben copiarse a datasets finales sin reemplazar esos campos por evidencia real.
