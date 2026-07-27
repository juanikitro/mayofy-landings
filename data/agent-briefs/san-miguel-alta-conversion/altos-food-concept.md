# Site Brief 1: ALTOS -food concept-

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

- id: `google-ChIJ3ZENk7O9vJUR_qB-JTza_2M`
- slug: `altos-food-concept`
- name: ALTOS -food concept-
- source name: ALTOS -food concept-
- category: Restaurant
- inferred profile: Taller mecanico
- requested segment: gastronomia y eventos
- city: San Miguel
- address: Belgrano 980, B1663 San Miguel, Provincia de Buenos Aires, Argentina
- phone: 011 7084-5458
- hours summary: Lunes a Domingo: 9:00 a. m. – 12:00 a. m.
- rating: 4.5 / 5 (1261 reseñas)
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
      "title": "4.5 / 5",
      "body": "1261 resenas registradas en las fuentes disponibles.",
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
      "title": "Lunes a Domingo: 9:00 a. m. – 12:00 a. m.",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "011 7084-5458"
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
    "title": "ALTOS -food concept-: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: taller mecanico, direccion y horario.",
    "primary_label": "Consultar turno",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Excellent service and food." — Nancy Chabria (5/5)
2. "Excelente lugar para una buena entraña, la mejor de la zona en porción y sabor. Y los chinchulines exquisitos. Excelente atención." — Florencia Rodriguez (5/5)
3. "Excelente la comida, excelente lugar, excelente la atención un lugar acogedor, tranquilo y familiar. Súper recomendable los precios acordé a una salida, siempre vuelvo" — Karina Vero (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJ3ZENk7O9vJUR_qB-JTza_2M/photos/AWCwydgjgUtk2YnLqCfl7-0AbXJYo_qKKCv0F-Q9sS0FFqECzu71YIcYkfHR2JOsYDpuEexoQzedltrTZHhRbryH-2Sd1Ojyu5VUN2ScauOEvRipUkJQW444s2WFoJwm0kZU1HjJ7Myj8hhNRwcevMmg7QMnlfwDwcPwU8SiJRivS69K5S7_eTcxC9QNyiLrmYrxOZi-dPL2cS5IMgmbxOnLeAsvIDwxqHNT31HeouxwdUMTSATlj_yGucXnwmP1d5tQsNiTVWOeTw9ml4zxK_T4swislIUNrhbOwka_pCZaWYnmA6IQz7o-qPiX3GXPPN360E2TgnaqaSzssKtgLBcs_A6AGy16_L3lG8t2T5JqbO8TY7m6FT2zr2XwRz2CWyQJNJW7idUNhP-BDiSSi3IQQop8f0Oqx2hSie_BEYt94UY/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJ3ZENk7O9vJUR_qB-JTza_2M/photos/AWCwydiVGg_HLDmSI3yxXRufY2oesWfaKBFm4LiVLy5BwQWDg4OKSdVUTbN4l2tSE8AtfRqrzVSXNJOknd90koeJQuqhmNK18hoRXoUSo-GvSpGy4FB3NOCheuGAoN8HQ45zTDXCalHNM-uhmzor-SJGK0uhLP8NXI7zB5hcm552kHBULT0Qa9cIc7bfgWj9Z6q8g0VKpVrExfWItAntuooWmdsWWEmrwvBrokF4K0VTV5skcOcdb6_3DBFV1XmI0ubsl8tLCtsY2ZbBi3G9Qry6zSX2KwlQzRf7IRTpURanJPmMuum3JpZeK1xHpfWWl31RXIC8nAWisgJmGUSY3VNOh-4fhTZme0VlSg0reAvRIj9C5FQa3h63MeHNcr3DnLHthS1eJ6Dt60WuarH7Hqt8d5t7S8Fx2_ia7IJ9LSJLZYzuoQ/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJ3ZENk7O9vJUR_qB-JTza_2M/photos/AWCwydjh6c0gh5g7uKuIon4-GZfQ4LWSvjgRWDh6DjL2A-QULhwlzKikQt59AvmGPAmPa8wFOKaF3y2wjZUuyUwT74JvmAd5yVArL5zZvr8HIcl9-vI8AE2QycZ7kZE7paW0ijZapvtbA5kSKBt7j7BtgAYMCvV7w2VfM0vkfzDXL-RcX9ctsEFX2TNXa7aOHRMvk-OfEjiXMEm1X0dPVaOChgIUPw3wbF8qcNtNMHQ1MxL9jK9YqpveGV6Oi6Pjfv5SmK_4fRryzxcf4NlO4md4j4wjYibW3GpKsjo0hIfSgIq9PQYHpOaVo5yc4ueO9dfAKi8SD52saM_eW6M0O5csR4K5oyFLqWP_sVDfTFkYsIFFL0Kn6pU1aFI6OVTZkTWInBeyiKtIxZpzwDMxuwirtCzHoL03R_r0YPyB6jqswM81fWkN/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=7205717880678031614&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.google.com/maps/contrib/106209364819468744867/reviews
- https://www.google.com/maps/contrib/104963512866477355574/reviews
- https://www.google.com/maps/contrib/103775952960826185302/reviews


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
  "business_id": "google-ChIJ3ZENk7O9vJUR_qB-JTza_2M",
  "slug": "altos-food-concept",
  "visual_mood": "roadside-urgent",
  "composition": "split-command",
  "headline": "ALTOS -food concept-",
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
    "4.5 sobre 5 con 1261 reseñas",
    "Horario: Lunes a Domingo: 9:00 a. m. – 12:00 a. m.",
    "Direccion: Belgrano 980, B1663 San Miguel",
    "Reseñas que destacan: \"Excellent service and food.\""
  ],
  "resource_title": "Informacion util antes de llevar el auto",
  "resource_items": [
    "Rubro y direccion destacados desde el primer bloque.",
    "Resenas visibles para evaluar la atencion.",
    "Horario registrado: Lunes a Domingo: 9:00 a. m. – 12:00 a. m.."
  ],
  "review_heading": "Lo que valoran quienes ya fueron",
  "contact_heading": "Llegar o llamar sin vueltas",
  "image_prompt": "Escena editorial realista para taller mecanico en San Miguel, Buenos Aires, fachada de local barrial y herramientas de trabajo, luz natural, usable como imagen generica de apoyo si las fotos reales son pobres, sin texto, sin logos, sin marcas ni datos inventados del negocio.",
  "design_notes": "Mood roadside-urgent, composicion split-command, template de conversion editorial-local-story, tono comercial practical-workshop. Evitar estetica SaaS generica; usar recursos visuales del rubro taller mecanico, direccion, prueba social, paquetes editables y CTA de turno.",
  "conversion_template": "editorial-local-story",
  "design_brief": {
    "market_position": "ALTOS -food concept- debe vender una consulta concreta de taller mecanico para personas que ya estan cerca de decidir, no una presentacion institucional.",
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
      "Mostrar horario publicado como dato operativo: Lunes a Domingo: 9:00 a. m. – 12:00 a. m..",
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
        "title": "4.5 / 5",
        "body": "1261 resenas registradas en las fuentes disponibles.",
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
        "title": "Lunes a Domingo: 9:00 a. m. – 12:00 a. m.",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Telefono directo",
        "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        "meta": "011 7084-5458"
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
      "title": "ALTOS -food concept-: el proximo paso es simple",
      "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: taller mecanico, direccion y horario.",
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
        "value": "4.5 / 5",
        "note": "Dato verificado"
      },
      {
        "label": "Rubro",
        "value": "Taller mecanico",
        "note": "Base verificada"
      },
      {
        "label": "Agenda",
        "value": "Lunes a Domingo: 9:00 a. m. – 12:00 a. m.",
        "note": "Dato verificado"
      },
      {
        "label": "Contacto",
        "value": "Telefono directo",
        "note": "011 7084-5458"
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
            "value": "4.5 / 5",
            "note": "1261 resenas registradas en las fuentes disponibles."
          },
          {
            "label": "Rubro",
            "value": "Taller mecanico",
            "note": "El sitio debe vender el servicio principal sin sumar prestaciones no confirmadas."
          },
          {
            "label": "Agenda",
            "value": "Lunes a Domingo: 9:00 a. m. – 12:00 a. m.",
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
            "note": "Consultar turno"
          }
        ]
      },
      {
        "type": "quick-actions",
        "eyebrow": "Accion",
        "title": "ALTOS -food concept-: el proximo paso es simple",
        "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: taller mecanico, direccion y horario.",
        "items": [
          {
            "label": "CTA",
            "value": "Consultar turno",
            "note": "011 7084-5458"
          },
          {
            "label": "Ubicacion",
            "value": "Belgrano 980, B1663 San Miguel, Provincia de Buenos Aires, Argentina"
          },
          {
            "label": "Horario",
            "value": "Lunes a Domingo: 9:00 a. m. – 12:00 a. m."
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/san-miguel-gastronomia-y-eventos/altos-food-concept`
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
