# Site Brief 1: Sauco Viajes

## Goal

Write or refine one `SiteSpec` for this business and create its real frontend artifact. Use the agent session context, judgement, and frontend skill. Do not call the OpenAI API from repo scripts.

## Hard Rules

- Use only verified data below.
- Do not invent services, years, awards, guarantees, prices, certifications, owners, staff, or claims.
- Visible copy must be Spanish argentino, natural, local, commercial, and strong enough to sell the next action.
- If useful commercial facts are missing, use safe AI-assisted filler: generic rubro imagery, process visuals, texture, section names, microcopy, and "a confirmar" offers. Never present them as verified facts.
- When reviews or the verified offering highlight a specific item (e.g. empanadas fritas, entraña, chinchulines, sandwich de lomito, a signature dish or product), you MAY use stock or AI-generated images of that item with no "not a real photo" disclaimer: the item is evidenced, so the appetizing image works as a serving suggestion. This does NOT extend to venue/installations/staff/results imagery (those still follow the editorial-hero honesty rule) and does NOT allow inventing commercial facts. See docs/DATA_RULES.md.
- The HERO image ALWAYS uses a memorable stock or AI-generated editorial asset, NEVER the Google Places photo (Places photos are usually weak and lower the bar; use them only to extract identity and as documentary context in inner sections). For a specific physical space (e.g. an event hall) the stock/AI hero must be atmospheric (event mood, table setting, lights) and its alt must not claim it is that exact venue. See docs/DATA_RULES.md.
- The contact card (the hours + address block near the end of the page) ALWAYS includes a "Cómo llegar" link to Google Maps right next to the address line, even when the section already has a separate Maps CTA elsewhere. Do not ship the address as plain text in that card.
- Internal placeholders may exist in specs, but the customer-facing HTML must not show raw brackets, "placeholder", "demo", "editable", "template", "landing", or "creado con IA".
- Avoid generic filler like "soluciones integrales", "calidad garantizada", "experiencia unica", "creado con IA".
- Keep the business name isolated to this one site.
- Make the page feel designed for "agencias de viajes y turismo" in Argentina, not like a SaaS template.
- Final generation expects an `agent_frontend`. The renderer fallback is only for rough preview.

## Business Snapshot

- id: `google-ChIJb07qArart5URWu9D5FKzUhY`
- slug: `sauco-viajes`
- name: Sauco Viajes
- source name: Sauco Viajes
- category: Travel Agency
- inferred profile: Travel Agency
- requested segment: agencias de viajes y turismo
- city: Argentina
- address: Av. Carlos Pellegrini 338, S2000 Rosario, Santa Fe, Argentina
- phone: 0341 598-2505
- hours summary: Lunes a Viernes; Sabado, Domingo cerrado
- rating: 5 / 5 (65 reseñas)
- service baseline: viajes grupales acompañados

## Suggested Commercial Profile

```json
{
  "tone": "practical-workshop",
  "customer_type": "Clientes locales que necesitan entender el servicio, llamar y llegar sin friccion.",
  "hero_claim": "Una landing clara para convertir una busqueda local en una consulta concreta.",
  "services": [
    "viajes grupales acompañados",
    "Atencion en local",
    "Consulta directa",
    "Ubicacion en Rosario"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "5.0 / 5",
      "body": "65 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Travel Agency",
      "body": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas.",
      "meta": "Base verificada"
    },
    {
      "label": "Agenda",
      "title": "Lunes a Viernes; Sabado, Domingo cerrado",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0341 598-2505"
    },
    {
      "label": "Confianza",
      "title": "Mas de [X] vehiculos",
      "body": "Placeholder editable para volumen real, anos o trabajos terminados si el negocio lo confirma.",
      "meta": "Demo editable",
      "is_demo": true
    }
  ],
  "service_cards": [
    {
      "label": "Servicio",
      "title": "viajes grupales acompañados",
      "body": "El servicio principal se muestra sin agregar prestaciones no verificadas."
    },
    {
      "label": "Contacto",
      "title": "Consulta directa",
      "body": "Telefono, direccion y horario se ordenan para reducir friccion."
    },
    {
      "label": "Prueba",
      "title": "Referencias publicas",
      "body": "Rating y resenas reales sostienen la decision."
    }
  ],
  "why_choose": [
    {
      "title": "Datos en orden",
      "body": "Nombre, direccion y contacto en un solo lugar."
    },
    {
      "title": "Sin claims falsos",
      "body": "No se inventan servicios, premios, precios ni trayectoria."
    },
    {
      "title": "CTA claro",
      "body": "La pagina empuja al siguiente paso verificable."
    }
  ],
  "packages": [
    {
      "name": "Consulta inicial",
      "price_label": "A confirmar",
      "body": "Bloque editable para convertir visitas en consultas utiles.",
      "items": [
        "Necesidad",
        "Horario",
        "Contacto"
      ],
      "is_demo": true
    },
    {
      "name": "Servicio principal",
      "price_label": "[Editable]",
      "body": "Espacio para detallar alcance cuando el negocio lo confirme.",
      "items": [
        "viajes grupales acompañados",
        "Alcance a confirmar",
        "Datos reales"
      ],
      "is_demo": true
    }
  ],
  "gallery": [
    {
      "label": "Antes",
      "title": "Foto real del ingreso",
      "body": "Espacio para mostrar el estado inicial del vehiculo, pieza o consulta.",
      "meta": "Placeholder visual",
      "is_demo": true
    },
    {
      "label": "Despues",
      "title": "Resultado o entrega",
      "body": "Lugar reservado para una foto propia del negocio, sin usar stock generico.",
      "meta": "Editable",
      "is_demo": true
    },
    {
      "label": "Travel Agency",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Contar la necesidad",
      "body": "El visitante consulta el servicio principal."
    },
    {
      "step": "02",
      "title": "Confirmar disponibilidad",
      "body": "El negocio valida horario, alcance y datos."
    },
    {
      "step": "03",
      "title": "Coordinar visita",
      "body": "Direccion y contacto quedan visibles."
    }
  ],
  "final_cta": {
    "title": "Sauco Viajes: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: travel agency, direccion y horario.",
    "primary_label": "Consultar",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Este maravilloso viaje a New York fue mi tercera visita a la ciudad y mi primer  experiencia como integrante de un numeroso grupo.
Pude disfrutarlo de una forma diferente a la que acostumbraba, incorporando conocimientos y secretos en los relatos de nuestro guia Octavio que tuvo una inmensa paciencia. Gracias!!
Quiero destacar la excelente organizacion, dedicacion ,alegria y  calidez con la que nos acompañaron Nati, Joa, Leo y Sofi, siempre atentas en todos los detalles.
Recomiendo a SAUCO en la eleccion de agencia de viajes.
Viajaria nuevamente con ellas!!
Felicitaciones lo hacen muy bien!!" — SILVIA BRACCHI (5/5)
2. "No se puede explicar con palabras lo vivido en el
Viaje a Nueva York 2026 organizado por Sauco , cumplieron el contrato punto por punto , esto en lo que se refiere a lo legal.
En lo humano Nati, Joa , Leo y Sofi , las coordinadoras , estuvieron 24 hs pendientes de las necesidades del grupo siempre atentas , divertidas, dispuestas a hacer pasar un momento INOLVIDABLE a todos.
Queria tambien mencionar a Octavio el guia , que
Con su conocimiento profundo de NY nos regalo
las mejores historias.
Gracias a todas las divinas ,Nati, Joa, Leo y Sofi
por lo que me hicieron vivir.
En fin!!!!, no duden en sumarse a los viajes de esta empresa.

Vivi." — Viviana Massa (5/5)
3. "Viajar a New York fue maravilloso, disfrutamos desde la salida de Rosario hasta el regreso. Fue una fiesta compartir con un grupo con tanta buena onda y mi agradecimiento hacia Nati,  Joa, Sofi y Leo que nos acompañaron, guiaron y cuidaron todo el tiempo.
En realidad no tengo un solo punto negativo,  fue todo conocimiento,  y diversión.  Muchas gracias SAUCO VIAJES" — Susana Ines Pasqualini (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJb07qArart5URWu9D5FKzUhY/photos/AWCwydhGnxLQPL2FEhqMMWWZ9dZ2pQPhMAdTwk33gI0VtkCaGXdhL4sjQargB2Hrgi2jzqcxEb4UvxOdFEPs_5GveL-j_FQCBGz0rz6bHe4LfNwMGi4eHr-g7QeBe00zpcFZWGbjQjriXa9MJzB4eZ5RCf14jspvHKvJeoRah2m6xk-K0K5nz3Zh__qJxXKk7GKX6jQzJhvQTAyNn-QmWV2QQ0RIkOkWqHEKM3SDJuAP9g6sR-u8DGGDboEiZeXNhaWNwN_LjP-eq3leIdHp5gaAskNNmqjNbdXJVxV6yX-vrDgOEnOvnVNj5T_N-L-NceuSYyDXGOfrriPkqN8xk4Fh0ddxaXKLMarqyixc8bMFbn6vcjxzS41Ipio1illl6nUYJLLKXKWy8BZ8txzxwxeLzTLwf2kakEDIQjunhXWpCE36V5Mb/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJb07qArart5URWu9D5FKzUhY/photos/AWCwydgoASzS68umwlA90r6l5YZiDxaT50HtiLlswNRvGvsCENWBFCUax0492PS3qbzkLml_w6rm-LU664IHvoQ0SwT4v17ifSPnd_ycB7hXY4-o3-X7tvIDujpijShYWfEaxxDUx9bN8pi6YlK70h9kc47gF1UTRW2mVjOtkVUSqkQEZLMSVMr422yixXd3oeWBz2KiFaS7F7JSocXS2j1CAHJCk1cTRDaCSwlzByf4QD0bVOrvMYhT_bE0FNaMntCK92i8C48tkGbt8bcTdvYtYieUcJBsLHK54TfAq_7brfwYAJcsGnBWy4gebPKoVpi9U3lg9y9TzdNXTDjya1ZzXQ4hAkiNNtbqf5_k9QuPJaR8iLSNQAqNc5UiwiK-quvwLqP_0tBLaQKO1aLrDGQ-Zvo8KNOyK_QAl5lPKt-U-wvQPzTX/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJb07qArart5URWu9D5FKzUhY/photos/AWCwydiedXP-JbKS-EZ7Tw22Wh9cJRrvU4_tsHr37jPrXmJsJSjcbUybGzo_gv8l9w6qMx0_7OattxtMlCFgDMT2ZAr5xEfEhZ1-kdXUCUuBkV7Joj-nZCON94eUFcpTAJa4W2f-XTqnm0JqnccAEwhIGG9D4_octEu5ujkCekrlCoVFA77ogSEfVRDyO_pgC_e3fDZCpRFfu2EQM__sKjxR79IblBuK-F3rPgrIZ8adBE__rencnSjfmUMmFXF8dIOAvXc80y2NUFFfyoPsF05XDYDGQCJE5omtqTm2M5jHMzGWlCRWLobSY9iLZiV6cLeqATBDtR0X6c3zCdCs6OTJ7Y5DBpn_ySGDpMpo6LZdqw79xX9LDmBfyVWk69QlLzNkGyG2OgalA4CuiJIxTZ1_LXuGVUL7UbUpy8-SwmbQgHAyPAHT/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=1608545185523035994&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.instagram.com/saucoviajes/
- https://www.facebook.com/saucoviajes/
- https://www.cuitonline.com/detalle/30717442926/sauco-viajes-s.-r.-l.html
- https://mauroturismo.com.ar/agencia-turismo/sauco-viajes/
- https://www.google.com/maps/contrib/117204648744492362145/reviews
- https://www.google.com/maps/contrib/103740813365947530562/reviews
- https://www.google.com/maps/contrib/105518950480167778103/reviews


## Recommended Design Direction

- Use cues from the agencias de viajes y turismo domain and the local retail/service context in Argentina.
- Quality matters more than cheap or fast generation.
- Choose one proven conversion template: `hero-proof-offer`, `editorial-local-story`, `visual-menu`, `service-diagnostic`, `catalog-counter`, or `urgent-call-first`.
- Build a real landing structure: strong hero, trust bar, services, why choose, offer/options, before/after or gallery, process, reviews/contact, final CTA.
- Make sparse data look intentional: use AI-generated generic imagery and crafted microcopy where the source data is thin. Do not leave empty generic cards.
- Automotive references to emulate structurally: strong claim + numbers + services + CTA to booking; urban/aggressive wrapping/custom style; detailing service taxonomy; emotional hero; packages; before/after; reviews.
- You may use plain HTML/CSS or a framework/library if it materially improves the final UI. You have broad discretion to use frontend/UI, animation, and icon libraries such as Aceternity UI (https://ui.aceternity.com/components), shadcn/ui (https://ui.shadcn.com/docs/components), Magic UI (https://magicui.design/), Framer Motion, GSAP, Motion One, lucide-react, React Icons, or similar component/motion kits when they raise product quality.
- If using a framework, build/export it yourself and point `agent_frontend.output_dir` at the static output.
- Avoid making the 5 pages share the same hero rhythm, card system, font pairing, spacing scale, or composition.
- Prefer concrete microcopy based on the signals above.
- Vary `visual_mood` and `composition` across this 5-site batch.
- Avoid repeating the same hero rhythm, proof order, and CTA wording from nearby briefs.
- If the page would otherwise look templated, use a high-conversion template deliberately: first viewport promise + proof + CTA, visible image, objection handling, offer/options, process, final CTA. Make it polished rather than novel.

## Current Spec, If Any

```json
{
  "business_id": "google-ChIJb07qArart5URWu9D5FKzUhY",
  "slug": "sauco-viajes",
  "visual_mood": "roadside-urgent",
  "composition": "split-command",
  "headline": "Sauco Viajes",
  "subheadline": "Una sitio clara para convertir una busqueda local en una consulta concreta. Travel Agency en Rosario con contacto, horarios, ubicacion y referencias publicas arriba del pliegue.",
  "primary_cta": "Consultar",
  "secondary_cta": "Ver ubicacion",
  "service_tags": [
    "viajes grupales acompañados",
    "Atencion en local",
    "Consulta directa",
    "Ubicacion en Rosario"
  ],
  "proof_points": [
    "5.0 sobre 5 con 65 reseñas",
    "Horario: Lunes a Viernes; Sabado, Domingo cerrado",
    "Direccion: Av. Carlos Pellegrini 338, S2000 Rosario",
    "Reseñas que destacan: \"Este maravilloso viaje a New York fue mi tercera visita a la ciudad y mi primer  experiencia...\""
  ],
  "resource_title": "Datos claros para decidir",
  "resource_items": [
    "Nombre, direccion y contacto en un solo lugar.",
    "Resenas: \"Este maravilloso viaje a New York fue mi tercera visita a la ciudad y mi primer exper...\".",
    "Horario registrado: Lunes a Viernes; Sabado, Domingo cerrado."
  ],
  "review_heading": "Lo que valoran quienes ya fueron",
  "contact_heading": "Llegar o llamar sin vueltas",
  "image_prompt": "Escena editorial realista para travel agency en Rosario, fachada de local barrial y herramientas de trabajo, luz natural, usable como imagen generica de apoyo si las fotos reales son pobres, sin texto, sin logos, sin marcas ni datos inventados del negocio.",
  "design_notes": "Mood roadside-urgent, composicion split-command, template de conversion editorial-local-story, tono comercial practical-workshop. Evitar estetica SaaS generica; usar recursos visuales del rubro travel agency, direccion, prueba social, paquetes editables y CTA de turno.",
  "conversion_template": "editorial-local-story",
  "design_brief": {
    "market_position": "Sauco Viajes debe vender una consulta concreta de travel agency para personas que ya estan cerca de decidir, no una presentacion institucional.",
    "visual_thesis": "Pagina editorial de comercio local: nombre, oficio, direccion y criterios de decision se leen como una marca real, no como una grilla generica.",
    "copy_voice": "Español argentino claro, comercial y local. Frases cortas, verbos de accion y beneficios visibles. Hablarle a alguien que esta por llamar, pedir presupuesto o acercarse.",
    "layout_signature": "Foto principal dominante, barra de confianza compacta, oferta en tarjetas y cierre de contacto con CTA repetido.",
    "asset_plan": "Usar fotos reales como protagonistas. La IA puede completar fondos, texturas, iconos, escenas de detalle y placeholders visuales del proceso sin reemplazar datos del negocio.",
    "ai_fill_plan": {
      "copy": [
        "Convertir datos pobres en microcopy de decision: que mandar, que preguntar, que se confirma.",
        "Crear nombres de secciones, etiquetas y CTAs naturales sin mencionar IA, template ni demo.",
        "Escribir paquetes orientativos como caminos de consulta, no como precios ni servicios inventados.",
        "Reformular reseñas publicas como señales de confianza sin inventar testimonios."
      ],
      "imagery": [
        "Generar escenas genericas del rubro cuando las fotos reales no alcancen: manos trabajando, detalle de material, mostrador, fachada abstracta o producto sin marca.",
        "Crear placeholders visuales utiles para antes/durante/despues con labels honestos, no fotos stock irrelevantes.",
        "Usar textura y color del rubro para que la pagina no dependa de una sola foto mala."
      ],
      "boundaries": [
        "No inventar precios, stock, marcas, años, premios, personal, garantias ni servicios no verificados.",
        "No inventar reseñas ni atribuir imagenes generadas al local.",
        "No mostrar placeholders crudos en la version cliente; convertirlos en campos editables solo para revision interna."
      ]
    },
    "anti_patterns": [
      "Hero generico con slogan abstracto y cards iguales debajo.",
      "Copy meta como 'esta landing puede convertir' o 'la pagina debe'.",
      "Grillas de tres tarjetas repetidas sin jerarquia visual.",
      "Imagen chica decorativa que no manda la composicion.",
      "CTA unico al final o botones con texto vago."
    ],
    "rewrite_targets": [
      "Rehacer el hero para que el negocio parezca real en los primeros 5 segundos.",
      "Cambiar bloques explicativos por decisiones del cliente: llamar, mandar foto, consultar disponibilidad, pasar por el local.",
      "Usar imagenes genericas IA solo para poblar contexto visual seguro, nunca como evidencia del negocio.",
      "Mostrar horario publicado como dato operativo: Lunes a Viernes; Sabado, Domingo cerrado.",
      "Bajar cualquier frase institucional que no ayude a pedir presupuesto o turno."
    ]
  },
  "commercial": {
    "tone": "practical-workshop",
    "customer_type": "Clientes locales que necesitan entender el servicio, llamar y llegar sin friccion.",
    "hero_claim": "Una sitio clara para convertir una busqueda local en una consulta concreta.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "5.0 / 5",
        "body": "65 resenas registradas en las fuentes disponibles.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Rubro",
        "title": "Travel Agency",
        "body": "El sitio debe vender el servicio principal sin sumar prestaciones no confirmadas.",
        "meta": "Base verificada"
      },
      {
        "label": "Agenda",
        "title": "Lunes a Viernes; Sabado, Domingo cerrado",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Telefono directo",
        "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        "meta": "0341 598-2505"
      },
      {
        "label": "Confianza",
        "title": "Mas de X vehiculos",
        "body": "datos a completar a confirmar para volumen real, anos o trabajos terminados si el negocio lo confirma.",
        "meta": "A confirmar",
        "is_demo": true
      }
    ],
    "service_cards": [
      {
        "label": "Servicio",
        "title": "viajes grupales acompañados",
        "body": "El servicio principal se muestra sin agregar prestaciones no verificadas."
      },
      {
        "label": "Contacto",
        "title": "Consulta directa",
        "body": "Telefono, direccion y horario se ordenan para reducir friccion."
      },
      {
        "label": "Prueba",
        "title": "Referencias publicas",
        "body": "Rating y resenas reales sostienen la decision."
      }
    ],
    "why_choose": [
      {
        "title": "Datos en orden",
        "body": "Nombre, direccion y contacto en un solo lugar."
      },
      {
        "title": "Sin claims falsos",
        "body": "se confirman servicios, premios, precios ni trayectoria."
      },
      {
        "title": "CTA claro",
        "body": "El sitio empuja al siguiente paso verificable."
      }
    ],
    "packages": [
      {
        "name": "Consulta inicial",
        "price_label": "A confirmar",
        "body": "Bloque a confirmar para convertir visitas en consultas utiles.",
        "items": [
          "Necesidad",
          "Horario",
          "Contacto"
        ],
        "is_demo": true
      },
      {
        "name": "Servicio principal",
        "price_label": "a confirmar",
        "body": "Espacio para detallar alcance cuando el negocio lo confirme.",
        "items": [
          "viajes grupales acompañados",
          "Alcance a confirmar",
          "Datos reales"
        ],
        "is_demo": true
      }
    ],
    "gallery": [
      {
        "label": "Antes",
        "title": "Foto real del ingreso",
        "body": "Espacio para mostrar el estado inicial del vehiculo, pieza o consulta.",
        "meta": "datos a completar visual",
        "is_demo": true
      },
      {
        "label": "Despues",
        "title": "Resultado o entrega",
        "body": "Lugar reservado para una foto propia del negocio, sin usar stock generico.",
        "meta": "a confirmar",
        "is_demo": true
      },
      {
        "label": "Travel Agency",
        "title": "Detalle del trabajo",
        "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
        "meta": "Foto a reemplazar",
        "is_demo": true
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Contar la necesidad",
        "body": "El visitante consulta el servicio principal."
      },
      {
        "step": "02",
        "title": "Confirmar disponibilidad",
        "body": "El negocio valida horario, alcance y datos."
      },
      {
        "step": "03",
        "title": "Coordinar visita",
        "body": "Direccion y contacto quedan visibles."
      }
    ],
    "final_cta": {
      "title": "Sauco Viajes: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: travel agency, direccion y horario.",
      "primary_label": "Consultar",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Las opciones marcadas como a confirmar ordenan la consulta sin publicar precios, stock o alcances no verificados."
  },
  "creative": {
    "concept": "Una sitio clara para convertir una busqueda local en una consulta concreta. Direccion comercial para Clientes locales que necesitan entender el servicio, llamar y llegar sin friccion.",
    "audience": "Clientes locales que necesitan entender el servicio, llamar y llegar sin friccion.",
    "visual_direction": "Servicio local con jerarquia fuerte, datos arriba, pasos claros y tarjetas de accion.",
    "layout": "mechanic-ledger",
    "texture": "service-ledger",
    "hero_angle": "Una sitio clara para convertir una busqueda local en una consulta concreta.",
    "hero_cards": [
      {
        "label": "Prueba social",
        "value": "5.0 / 5",
        "note": "Dato verificado"
      },
      {
        "label": "Rubro",
        "value": "Travel Agency",
        "note": "Base verificada"
      },
      {
        "label": "Agenda",
        "value": "Lunes a Viernes; Sabado, Domingo cerrado",
        "note": "Dato verificado"
      },
      {
        "label": "Contacto",
        "value": "Telefono directo",
        "note": "0341 598-2505"
      }
    ],
    "sections": [
      {
        "type": "service-board",
        "eyebrow": "Servicios",
        "title": "Datos claros para decidir",
        "body": "El sitio ordena datos publicos relevantes y deja como a confirmar cualquier dato comercial no verificado.",
        "items": [
          {
            "label": "Servicio",
            "value": "viajes grupales acompañados",
            "note": "El servicio principal se muestra sin agregar prestaciones no verificadas."
          },
          {
            "label": "Contacto",
            "value": "Consulta directa",
            "note": "Telefono, direccion y horario se ordenan para reducir friccion."
          },
          {
            "label": "Prueba",
            "value": "Referencias publicas",
            "note": "Rating y resenas reales sostienen la decision."
          }
        ]
      },
      {
        "type": "process",
        "eyebrow": "Proceso",
        "title": "De consulta a turno sin perder contexto",
        "body": "El usuario entiende que informacion enviar, que se confirma y como avanzar.",
        "items": [
          {
            "label": "01",
            "value": "Contar la necesidad",
            "note": "El visitante consulta el servicio principal."
          },
          {
            "label": "02",
            "value": "Confirmar disponibilidad",
            "note": "El negocio valida horario, alcance y datos."
          },
          {
            "label": "03",
            "value": "Coordinar visita",
            "note": "Direccion y contacto quedan visibles."
          }
        ]
      },
      {
        "type": "metric-grid",
        "eyebrow": "Confianza",
        "title": "Datos reales arriba, informacion a confirmar separada",
        "body": "El sitio combina fuentes verificadas con opciones comerciales que se completan antes de publicar.",
        "items": [
          {
            "label": "Prueba social",
            "value": "5.0 / 5",
            "note": "65 resenas registradas en las fuentes disponibles."
          },
          {
            "label": "Rubro",
            "value": "Travel Agency",
            "note": "El sitio debe vender el servicio principal sin sumar prestaciones no confirmadas."
          },
          {
            "label": "Agenda",
            "value": "Lunes a Viernes; Sabado, Domingo cerrado",
            "note": "Horario publicado para orientar la primera consulta."
          },
          {
            "label": "Contacto",
            "value": "Telefono directo",
            "note": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado."
          }
        ]
      },
      {
        "type": "material-story",
        "eyebrow": "Direccion visual",
        "title": "El sitio se apoya en imagen real y escenas seguras de contexto.",
        "body": "Cuando los datos o fotos son pobres, la composicion puede sumar atmosfera, textura y proceso sin atribuir esos recursos al negocio.",
        "items": [
          {
            "label": "Foto real",
            "value": "Usar como prueba",
            "note": "Priorizar la mejor imagen publica disponible."
          },
          {
            "label": "Apoyo visual",
            "value": "Poblar contexto",
            "note": "Herramientas, material, mostrador o proceso sin marcas falsas."
          },
          {
            "label": "Cliente",
            "value": "Siguiente paso claro",
            "note": "Consultar"
          }
        ]
      },
      {
        "type": "quick-actions",
        "eyebrow": "Accion",
        "title": "Sauco Viajes: el proximo paso es simple",
        "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: travel agency, direccion y horario.",
        "items": [
          {
            "label": "CTA",
            "value": "Consultar",
            "note": "0341 598-2505"
          },
          {
            "label": "Ubicacion",
            "value": "Av. Carlos Pellegrini 338, S2000 Rosario, Santa Fe, Argentina"
          },
          {
            "label": "Horario",
            "value": "Lunes a Viernes; Sabado, Domingo cerrado"
          }
        ]
      }
    ]
  }
}
```


## SiteSpec Schema Shape

Return one object with:

- `business_id`
- `slug`
- `visual_mood`: one of `roadside-urgent`, `workshop-trust`, `precision-service`, `neighborhood-direct`, `fleet-utility`
- `composition`: one of `split-command`, `poster-bay`, `route-card`, `service-ledger`, `photo-board`
- `headline`
- `subheadline`
- `primary_cta`
- `secondary_cta`
- `service_tags`: 3 to 5 strings
- `proof_points`: 3 to 4 strings
- `resource_title`
- `resource_items`: 3 to 4 strings
- `review_heading`
- `contact_heading`
- `image_prompt`
- `design_notes`
- `conversion_template`: one of `hero-proof-offer`, `editorial-local-story`, `visual-menu`, `service-diagnostic`, `catalog-counter`, `urgent-call-first`
- `design_brief`: required for future/remake quality:
  - `market_position`: what this page sells and for whom
  - `visual_thesis`: concrete art direction tied to the business/rubro
  - `copy_voice`: how the copy should sound and what it must avoid
  - `layout_signature`: what makes this page structurally specific
  - `asset_plan`: how real photos and safe AI generic imagery are used
  - `ai_fill_plan.copy`: how AI enriches thin data without false claims
  - `ai_fill_plan.imagery`: what non-specific images/textures can be generated
  - `ai_fill_plan.boundaries`: explicit limits: no fake prices, stock, brands, years, awards, guarantees, services or reviews
  - `anti_patterns`: visible failure modes to avoid
  - `rewrite_targets`: what to improve if remaking an existing page
- `commercial`: recommended for sellable landings:
  - `tone`: `premium-detailing`, `urban-custom`, `practical-workshop`, `fast-local`, `parts-counter`, or `bodyshop-craft`
  - `customer_type`
  - `hero_claim`
  - `trust_bar`: 3 to 5 cards with `label`, `title`, `body`, optional `meta`, optional `is_demo`
  - `service_cards`: 3 to 6 benefit-led service cards
  - `why_choose`: 3 to 5 reasons tied to the business/rubro
  - `packages`: 2 to 4 offer/options; no fake prices
  - `gallery`: 2 to 4 before/after, real-photo or AI-safe generic visual blocks
  - `process`: 3 to 5 steps from inquiry to visit/booking
  - `final_cta`: `title`, `body`, `primary_label`, `secondary_label`
  - `editable_note`: short warning for placeholders
- `agent_frontend`: required for final quality generation:
  - `mode`: `static-files` or `framework-build`
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/argentina-agencias-de-viajes-y-turismo/sauco-viajes`
  - `output_dir`: required only for `framework-build`; points to the static build output copied by the generator
  - `build_command`: optional note, not executed by the generator
  - `libraries`: optional list of real libraries used
  - `notes`: short explanation of the visual direction and why it fits this business
- `creative`: object used by the renderer to make the page feel custom:
  - `concept`: commercial idea for this specific business
  - `audience`: who is likely to search/contact
  - `visual_direction`: concrete art direction, not generic adjectives
  - `layout`: one of `studio-detail`, `wash-flow`, `oil-bay`, `roadside-rescue`, `bodyshop-craft`, `parts-counter`, `mechanic-ledger`
  - `texture`: one of `polished-glass`, `water-ripple`, `oil-label`, `road-markings`, `primer-dust`, `parts-shelf`, `service-ledger`
  - `hero_angle`: one strong commercial sentence for the hero
  - `hero_cards`: 2 to 4 cards with `label`, `value`, optional `note`
  - `sections`: 3 to 5 blocks. Each block has `type`, `eyebrow`, `title`, `body`, `items`, optional `callout`.

Creative block `type` values:

- `service-board`
- `process`
- `quote-strip`
- `quick-actions`
- `material-story`
- `metric-grid`

The `agent_frontend` artifact is the main place where the page stops being a template. The `design_brief` and `creative` objects remain useful as planning metadata and fallback input, but the final UI must be authored.
