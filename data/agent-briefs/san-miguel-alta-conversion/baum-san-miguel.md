# Site Brief 2: Baum San Miguel

## Goal

Write or refine one `SiteSpec` for this business and create its real frontend artifact. Use the agent session context, judgement, and frontend skill. Do not call the OpenAI API from repo scripts.

## Hard Rules

- Use only verified data below.
- Do not invent services, years, awards, guarantees, prices, certifications, owners, staff, or claims.
- Visible copy must be Spanish argentino, natural, local, commercial, and strong enough to sell the next action.
- If useful commercial facts are missing, use safe AI-assisted filler: generic rubro imagery, process visuals, texture, section names, microcopy, and "a confirmar" offers. Never present them as verified facts.
- Internal placeholders may exist in specs, but the customer-facing HTML must not show raw brackets, "placeholder", "demo", "editable", "template", "landing", or "creado con IA".
- Avoid generic filler like "soluciones integrales", "calidad garantizada", "experiencia unica", "creado con IA".
- Keep the business name isolated to this one site.
- Make the page feel designed for "gastronomia y eventos" in San Miguel, not like a SaaS template.
- Final generation expects an `agent_frontend`. The renderer fallback is only for rough preview.

## Business Snapshot

- id: `google-ChIJ9RiuJQ-9vJURJ2MmqwR7R0o`
- slug: `baum-san-miguel`
- name: Baum San Miguel
- source name: Baum San Miguel
- category: Bar
- inferred profile: Taller mecanico
- requested segment: gastronomia y eventos
- city: San Miguel
- address: GOA, Maestro Ángel D'Elía 1145, B1663 San Miguel, Provincia de Buenos Aires, Argentina
- phone: null
- hours summary: Lunes: 6:30 p. m. – 2:00 a. m.
- rating: 4.3 / 5 (9393 reseñas)
- service baseline: restaurante

## Suggested Commercial Profile

```json
{
  "tone": "practical-workshop",
  "customer_type": "Conductores que necesitan diagnostico, mantenimiento o una primera consulta confiable.",
  "hero_claim": "Primero entender que le pasa al auto. Despues, coordinar bien el turno.",
  "services": [
    "Mecanica general",
    "Service",
    "Diagnostico",
    "Consulta por turno"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "4.3 / 5",
      "body": "9393 resenas registradas en las fuentes disponibles.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Rubro",
      "title": "Taller mecanico",
      "body": "La pagina debe vender el servicio principal sin sumar prestaciones no confirmadas.",
      "meta": "Base verificada"
    },
    {
      "label": "Agenda",
      "title": "Lunes: 6:30 p. m. – 2:00 a. m.",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Canal a confirmar",
      "body": "El frontend debe dejar visible que falta cargar telefono o WhatsApp antes de publicar.",
      "meta": "[WhatsApp editable]",
      "is_demo": true
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
      "label": "Diagnostico",
      "title": "Consulta con sintomas",
      "body": "La landing pide ruido, falla, kilometraje y contexto antes de prometer una solucion."
    },
    {
      "label": "Service",
      "title": "Mantenimiento ordenado",
      "body": "Bloque para service o revision si el taller lo confirma.",
      "is_demo": true
    },
    {
      "label": "Turno",
      "title": "Llamar con datos",
      "body": "CTA enfocado en coordinar horario, necesidad y disponibilidad."
    }
  ],
  "why_choose": [
    {
      "title": "Consulta mas clara",
      "body": "El visitante sabe que informacion dar antes de llevar el auto."
    },
    {
      "title": "Confianza visible",
      "body": "Resenas, rating y direccion aparecen como respaldo local."
    },
    {
      "title": "Sin diagnostico inventado",
      "body": "La landing no promete fallas resueltas ni marcas atendidas si no existen datos."
    }
  ],
  "packages": [
    {
      "name": "Diagnostico inicial",
      "price_label": "A confirmar",
      "body": "Para evaluar sintomas y definir siguiente paso.",
      "items": [
        "Sintoma",
        "Kilometraje",
        "Turno"
      ],
      "is_demo": true
    },
    {
      "name": "Service preventivo",
      "price_label": "[Editable]",
      "body": "Espacio para servicios confirmados por el taller.",
      "items": [
        "Aceite/filtros si aplica",
        "Revision",
        "Datos del vehiculo"
      ],
      "is_demo": true
    },
    {
      "name": "Reparacion puntual",
      "price_label": "[Presupuesto editable]",
      "body": "Bloque para trabajos reales luego de diagnostico.",
      "items": [
        "Falla reportada",
        "Revision presencial",
        "Piezas a confirmar"
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
      "label": "Taller mecanico",
      "title": "Detalle del trabajo",
      "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
      "meta": "Foto a reemplazar",
      "is_demo": true
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Contar sintomas",
      "body": "Ruido, falla, testigo, perdida o mantenimiento pendiente."
    },
    {
      "step": "02",
      "title": "Enviar datos",
      "body": "Modelo, kilometraje y urgencia ayudan a ordenar la consulta."
    },
    {
      "step": "03",
      "title": "Coordinar turno",
      "body": "Contacto y horario quedan visibles para avanzar."
    },
    {
      "step": "04",
      "title": "Definir trabajo",
      "body": "Repuestos, precio y plazo se confirman despues del diagnostico real."
    }
  ],
  "final_cta": {
    "title": "Baum San Miguel: el proximo paso es simple",
    "body": "Carga el telefono o WhatsApp para convertir esta landing en una via directa de consulta por taller mecanico.",
    "primary_label": "Consultar turno",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Real good place, great beer and not expensive at all... Dish sizes are huge! A must in BA night" — Alfredo Etchamendi (5/5)
2. "The menu and the way you order is very nice, all with your phone. I liked it. I ordered a table with a mix of small things that it's delicious. My friend ate triple meal hamburger but said was no so good.

The place is cozy but if don't book at some point you could find a large queue." — Fabian Sierra (RED) (4/5)
3. "Chilled vibe, friendly service and awesome food/beer." — Gabriel Machado (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJ9RiuJQ-9vJURJ2MmqwR7R0o/photos/AWCwydgli3uvvQfYj6PhwyU-jCJnOyhJMkPB8I1d2wBkKYGzELU9tKpLlMsjidaUYI-923Z_pCyjy-MickTrlsr_cpinf3xYq5rKCPJGVhcdYHwO488lk1r5XqM5kAcdD88txaS_u_XQDLuJxiORBP6Yuu3tvCVIrR1pTfjDwg6TKPZKbpv-ATynm0CTNH4349TQKY4b6D-Qc-0pkZ6nmo08DZdOJU71RQmkCFmMyxObB0Tse-NmGL3KpklkrQt1BRE9aEkjSSogUA10DzfJvSUoKbaZtKc61_QG4-e7emXlWNLq1tuPKnZ9T6Nl0mOXNajoTIznpL2Z1OHAgzmIk5CeDjVgQOARSeoKT-aJUN-JL2P8q57HQuMTXkfnOsW5VLaJlCn_EcHPMhWs-WcydwGHYOQX4yKoalJdfpaMUDLT15S3Osff/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJ9RiuJQ-9vJURJ2MmqwR7R0o/photos/AWCwydhNHcmraXp-ZfFQkz4FgrV8ai68-cm7MnvLyV0hmn5EiZmkUXNF0zmYkbo5v9Prpt9_jS-yOSD1eR1tG5JjgvULIdF4UGXLYy6UwAVZhPheYIvD0zPLczJ_LOzh3jcO3nE-i12_OHKaboc1tlNjNycMfW0HV6QX7g_OAZu4jEaAkMvwZhFCFuXSkA229E5PiccfZfYuLopI9eT5twh4801arFuwkJ5HgaVLuZzO4Sbaby-dCPL1pu-9Vea0kJk6yqGa1ESVBch8FT0vPI4aL8WubOts8u28kZGpWyjTqOYNp1T1iW4pncR-0NPl5mfGxB4gTT6fnKcLk0HGK-gkEsMdlzj8oW3cWno4EowPtWiSdEafqH8FqBoXWyf6m8y4vHL1IadIBddi_75Nx2DfecWsZSCmkZzGFT23ka-_VjCSm2dYHk7DUmZdLDkzew/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJ9RiuJQ-9vJURJ2MmqwR7R0o/photos/AWCwydjRTU-LsWx3RwyvEk4ievk4wuBJvU4rioKhC6y701EEX_yRVdwGtJTqBSTmzNV5xTb3W3SbrPeL7qX2PJt-1Xsw_gypioiAK4bS1uNPfLp5p5dAPlR6zasbVB_Aw4vO_3XXUogm8-WSHPO_P_Q3IaCQWY1inXcM4FLtoGJSMO8cTvC0ETHLmkYxoEsX4EbjNE-Syg1chSQ3dOI45HzGj5c0HVRcUJ8qTfPq541ujV_EEU1mIxgo7iF_GYwCruoQjK4TnP0gWznJ93Em8ZdxmNU_-xv2zrqo2y0ctbvRDGQsYMAMvX5JW_MVCFFiXtF7cTg-wKgYlqVWem5ulRNvjWqYcj4sMbVZD-_NEa8xOIlx34KguuQLNFUzopJs8BaKk1cGA3MHX99T4xomnqZKvhfKwwzSoWActB5euD_4goPzzJspccCRiEYHAvrpbpwV/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=5352381942134629159&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/104846209680513655865/reviews
- https://www.google.com/maps/contrib/116016097532562197045/reviews
- https://www.google.com/maps/contrib/103119492199644467110/reviews


## Recommended Design Direction

- Use cues from the gastronomia y eventos domain and the local retail/service context in San Miguel.
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
  "business_id": "google-ChIJ9RiuJQ-9vJURJ2MmqwR7R0o",
  "slug": "baum-san-miguel",
  "visual_mood": "workshop-trust",
  "composition": "poster-bay",
  "headline": "Baum San Miguel",
  "subheadline": "Primero entender que le pasa al auto. Despues, coordinar bien el turno. Taller mecanico en San Miguel, Buenos Aires con contacto, horarios, ubicacion y referencias publicas arriba del pliegue.",
  "primary_cta": "Consultar turno",
  "secondary_cta": "Ver ubicacion",
  "service_tags": [
    "Mecanica general",
    "Service",
    "Diagnostico",
    "Consulta por turno"
  ],
  "proof_points": [
    "4.3 sobre 5 con 9393 reseñas",
    "Horario: Lunes: 6:30 p. m. – 2:00 a. m.",
    "Direccion: GOA, Maestro Ángel D'Elía 1145",
    "Reseñas que destacan: \"Real good place, great beer and not expensive at all... Dish sizes are huge! A must in BA ni...\""
  ],
  "resource_title": "Informacion util antes de llevar el auto",
  "resource_items": [
    "Rubro y direccion destacados desde el primer bloque.",
    "Resenas visibles para evaluar la atencion.",
    "Horario registrado: Lunes: 6:30 p. m. – 2:00 a. m.."
  ],
  "review_heading": "Lo que valoran quienes ya fueron",
  "contact_heading": "Llegar o llamar sin vueltas",
  "image_prompt": "Escena editorial realista para taller mecanico en San Miguel, Buenos Aires, fachada de local barrial y herramientas de trabajo, luz natural, usable como imagen generica de apoyo si las fotos reales son pobres, sin texto, sin logos, sin marcas ni datos inventados del negocio.",
  "design_notes": "Mood workshop-trust, composicion poster-bay, template de conversion editorial-local-story, tono comercial practical-workshop. Evitar estetica SaaS generica; usar recursos visuales del rubro taller mecanico, direccion, prueba social, paquetes editables y CTA de turno.",
  "conversion_template": "editorial-local-story",
  "design_brief": {
    "market_position": "Baum San Miguel debe vender una consulta concreta de taller mecanico para personas que ya estan cerca de decidir, no una presentacion institucional.",
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
      "Mostrar horario publicado como dato operativo: Lunes: 6:30 p. m. – 2:00 a. m..",
      "Bajar cualquier frase institucional que no ayude a pedir presupuesto o turno."
    ]
  },
  "commercial": {
    "tone": "practical-workshop",
    "customer_type": "Conductores que necesitan diagnostico, mantenimiento o una primera consulta confiable.",
    "hero_claim": "Primero entender que le pasa al auto. Despues, coordinar bien el turno.",
    "trust_bar": [
      {
        "label": "Prueba social",
        "title": "4.3 / 5",
        "body": "9393 resenas registradas en las fuentes disponibles.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Rubro",
        "title": "Taller mecanico",
        "body": "El sitio debe vender el servicio principal sin sumar prestaciones no confirmadas.",
        "meta": "Base verificada"
      },
      {
        "label": "Agenda",
        "title": "Lunes: 6:30 p. m. – 2:00 a. m.",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Canal a confirmar",
        "body": "El canal directo queda marcado como dato a confirmar antes de publicar.",
        "meta": "WhatsApp a confirmar",
        "is_demo": true
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
        "label": "Diagnostico",
        "title": "Consulta con sintomas",
        "body": "La sitio pide ruido, falla, kilometraje y contexto antes de prometer una solucion."
      },
      {
        "label": "Service",
        "title": "Mantenimiento ordenado",
        "body": "Bloque para service o revision si el taller lo confirma.",
        "is_demo": true
      },
      {
        "label": "Turno",
        "title": "Llamar con datos",
        "body": "CTA enfocado en coordinar horario, necesidad y disponibilidad."
      }
    ],
    "why_choose": [
      {
        "title": "Consulta mas clara",
        "body": "El visitante sabe que informacion dar antes de llevar el auto."
      },
      {
        "title": "Confianza visible",
        "body": "Resenas, rating y direccion aparecen como respaldo local."
      },
      {
        "title": "Sin diagnostico inventado",
        "body": "La sitio no promete fallas resueltas ni marcas atendidas si no existen datos."
      }
    ],
    "packages": [
      {
        "name": "Diagnostico inicial",
        "price_label": "A confirmar",
        "body": "Para evaluar sintomas y definir siguiente paso.",
        "items": [
          "Sintoma",
          "Kilometraje",
          "Turno"
        ],
        "is_demo": true
      },
      {
        "name": "Service preventivo",
        "price_label": "a confirmar",
        "body": "Espacio para servicios confirmados por el taller.",
        "items": [
          "Aceite/filtros si aplica",
          "Revision",
          "Datos del vehiculo"
        ],
        "is_demo": true
      },
      {
        "name": "Reparacion puntual",
        "price_label": "Presupuesto a confirmar",
        "body": "Bloque para trabajos reales luego de diagnostico.",
        "items": [
          "Falla reportada",
          "Revision presencial",
          "Piezas a confirmar"
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
        "label": "Taller mecanico",
        "title": "Detalle del trabajo",
        "body": "Plano corto de materiales, herramientas, terminaciones o mostrador segun el rubro.",
        "meta": "Foto a reemplazar",
        "is_demo": true
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Contar sintomas",
        "body": "Ruido, falla, testigo, perdida o mantenimiento pendiente."
      },
      {
        "step": "02",
        "title": "Enviar datos",
        "body": "Modelo, kilometraje y urgencia ayudan a ordenar la consulta."
      },
      {
        "step": "03",
        "title": "Coordinar turno",
        "body": "Contacto y horario quedan visibles para avanzar."
      },
      {
        "step": "04",
        "title": "Definir trabajo",
        "body": "Repuestos, precio y plazo se confirman despues del diagnostico real."
      }
    ],
    "final_cta": {
      "title": "Baum San Miguel: el proximo paso es simple",
      "body": "Carga el telefono o WhatsApp para convertir esta sitio en una via directa de consulta por taller mecanico.",
      "primary_label": "Consultar turno",
      "secondary_label": "Ver ubicacion"
    },
    "editable_note": "Las opciones marcadas como a confirmar ordenan la consulta sin publicar precios, stock o alcances no verificados."
  },
  "creative": {
    "concept": "Primero entender que le pasa al auto. Despues, coordinar bien el turno. Direccion comercial para Conductores que necesitan diagnostico, mantenimiento o una primera consulta confiable.",
    "audience": "Conductores que necesitan diagnostico, mantenimiento o una primera consulta confiable.",
    "visual_direction": "Servicio local con jerarquia fuerte, datos arriba, pasos claros y tarjetas de accion.",
    "layout": "mechanic-ledger",
    "texture": "service-ledger",
    "hero_angle": "Primero entender que le pasa al auto. Despues, coordinar bien el turno.",
    "hero_cards": [
      {
        "label": "Prueba social",
        "value": "4.3 / 5",
        "note": "Dato verificado"
      },
      {
        "label": "Rubro",
        "value": "Taller mecanico",
        "note": "Base verificada"
      },
      {
        "label": "Agenda",
        "value": "Lunes: 6:30 p. m. – 2:00 a. m.",
        "note": "Dato verificado"
      },
      {
        "label": "Contacto",
        "value": "Canal a confirmar",
        "note": "WhatsApp a confirmar"
      }
    ],
    "sections": [
      {
        "type": "service-board",
        "eyebrow": "Servicios",
        "title": "Informacion util antes de llevar el auto",
        "body": "La propuesta hace que la primera consulta sea mas precisa sin prometer diagnosticos no verificados.",
        "items": [
          {
            "label": "Diagnostico",
            "value": "Consulta con sintomas",
            "note": "La sitio pide ruido, falla, kilometraje y contexto antes de prometer una solucion."
          },
          {
            "label": "Service",
            "value": "Mantenimiento ordenado",
            "note": "Bloque para service o revision si el taller lo confirma."
          },
          {
            "label": "Turno",
            "value": "Llamar con datos",
            "note": "CTA enfocado en coordinar horario, necesidad y disponibilidad."
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
            "value": "Contar sintomas",
            "note": "Ruido, falla, testigo, perdida o mantenimiento pendiente."
          },
          {
            "label": "02",
            "value": "Enviar datos",
            "note": "Modelo, kilometraje y urgencia ayudan a ordenar la consulta."
          },
          {
            "label": "03",
            "value": "Coordinar turno",
            "note": "Contacto y horario quedan visibles para avanzar."
          },
          {
            "label": "04",
            "value": "Definir trabajo",
            "note": "Repuestos, precio y plazo se confirman despues del diagnostico real."
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
            "value": "4.3 / 5",
            "note": "9393 resenas registradas en las fuentes disponibles."
          },
          {
            "label": "Rubro",
            "value": "Taller mecanico",
            "note": "El sitio debe vender el servicio principal sin sumar prestaciones no confirmadas."
          },
          {
            "label": "Agenda",
            "value": "Lunes: 6:30 p. m. – 2:00 a. m.",
            "note": "Horario publicado para orientar la primera consulta."
          },
          {
            "label": "Contacto",
            "value": "Canal a confirmar",
            "note": "El canal directo queda marcado como dato a confirmar antes de publicar."
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
            "note": "Consultar turno"
          }
        ]
      },
      {
        "type": "quick-actions",
        "eyebrow": "Accion",
        "title": "Baum San Miguel: el proximo paso es simple",
        "body": "Carga el telefono o WhatsApp para convertir esta sitio en una via directa de consulta por taller mecanico.",
        "items": [
          {
            "label": "CTA",
            "value": "Consultar turno",
            "note": "Telefono a confirmar"
          },
          {
            "label": "Ubicacion",
            "value": "GOA, Maestro Ángel D'Elía 1145, B1663 San Miguel, Provincia de Buenos Aires, Argentina"
          },
          {
            "label": "Horario",
            "value": "Lunes: 6:30 p. m. – 2:00 a. m."
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/san-miguel-gastronomia-y-eventos/baum-san-miguel`
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
