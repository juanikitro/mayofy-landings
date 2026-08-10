# Site Brief 5: Junaza Viajes

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

- id: `google-ChIJeTtvOGxcIpQR-Q43kTjmvFU`
- slug: `junaza-viajes-y-turismo`
- name: Junaza Viajes
- source name: Junaza Viajes y Turismo
- category: Travel Agency
- inferred profile: Travel Agency
- requested segment: agencias de viajes y turismo
- city: Argentina
- address: Gral. José de San Martín 667 Piso 3 Of F, T4000 San Miguel de Tucumán, Tucumán, Argentina
- phone: 0381 430-7696
- hours summary: Lunes a Sabado; Domingo cerrado
- rating: 4.3 / 5 (24 reseñas)
- service baseline: viajes grupales, estudiantiles y de egresados

## Suggested Commercial Profile

```json
{
  "tone": "practical-workshop",
  "customer_type": "Clientes locales que necesitan entender el servicio, llamar y llegar sin friccion.",
  "hero_claim": "Una landing clara para convertir una busqueda local en una consulta concreta.",
  "services": [
    "viajes grupales, estudiantiles y de egresados",
    "Atencion en local",
    "Consulta directa",
    "Ubicacion en San Miguel de Tucumán"
  ],
  "trust_bar": [
    {
      "label": "Prueba social",
      "title": "4.3 / 5",
      "body": "24 resenas registradas en las fuentes disponibles.",
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
      "title": "Lunes a Sabado; Domingo cerrado",
      "body": "Horario publicado para orientar la primera consulta.",
      "meta": "Dato verificado",
      "is_demo": false
    },
    {
      "label": "Contacto",
      "title": "Telefono directo",
      "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
      "meta": "0381 430-7696"
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
      "title": "viajes grupales, estudiantiles y de egresados",
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
        "viajes grupales, estudiantiles y de egresados",
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
    "title": "Junaza Viajes: el proximo paso es simple",
    "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: travel agency, direccion y horario.",
    "primary_label": "Consultar",
    "secondary_label": "Ver ubicacion"
  }
}
```


## Useful Real Signals

### Reviews

1. "Excelente atención y más por sus propios dueños, precios de viajes acorde a la situación,  muy recomendable." — Jorge Kairuz (5/5)
2. "Excelente atención. Nos mostraron todos los viajes que hacen.  Se nota que son muy responsables." — Estela Carrillo (5/5)
3. "Calidez en la atención. Los viajes con esta agencia lo realizamos siempre sin  ningún inconveniente. Todo muy lindo" — Susana Myriam Gutierrez (5/5)

### Photos

1. other | allowed | https://places.googleapis.com/v1/places/ChIJeTtvOGxcIpQR-Q43kTjmvFU/photos/AWCwydgncRUI6DaS7k8hA3aUnI1W3rBKtIYIqlazlXRE_tOkTZKxlp8Cqg7MYcCACx3DeXt3Iy7H8FdquYcs5bGw_qjVndF02TMC5m-FQ7l4S7k32BMowMGUlqRYudmXefv3EYlPYNisT5FmQ-upZ9iS11nesoUC0hFbCkRcnTrqQWmj1d2OWNlX0nIlfDYD4T2oEFi-iJFfscixj8KdgfHqnIMG3xPCvOSE2e1BDWCquRua058PdFF3XPxnEnX0PrzYpJ-wDM8XsoZxR1d8Hm6yT9nJ7iinxx4qljNCrcazC0ki8L-qzQ_VX1DFo9f5_8IFUkkRKAj25Y3wjtx3-Ft_WpFatRestDEqO42upB9r5kZSgTw9yckpJl8OxIv4tCoI06hEm9hXMU-eOE4cikss8iJ3y6CInOAdR9uAq5vakfKeKaQC/media?maxWidthPx=1600
2. other | allowed | https://places.googleapis.com/v1/places/ChIJeTtvOGxcIpQR-Q43kTjmvFU/photos/AWCwydiblReaSRbWj_r0WSLeO32PKHWhIgAedm6CCoFlv-OynvBfQGbxiP1LSn_y6lu7c9JdQiPsIdhHBs0VDGKs0Bx5gHqncI1WFw3SrTDIuN5UcEve1jEVOaR9mBt-hCkCCHCRaTxQobWTBJlJmrh1CFyDRWlUOEsqaWqSKyvKOHZRWSFcqqIUVrMs1vfIE5WxKmWSu5LTmYg4SXSLA1zK0PE9phMkGFrdcv1_bJNsPaZiY4fkULbU-CY1O0SL4Vb5UgBrlppl7BbUAYUODEzRwqo3bTNnHHz8KcWZ4n6pIco_MkGn9vaZiEKLBlHPZ2b_gONvRfgPuODf-sOAWKc4gxTqys4SVK0tIFwXgqtRLDH0bg9fFihhJaFwSfi3utUs6z9lbxw860Wv4a0Xw0ap2GFUn2HgbDze4TS2x1DPVrNsloBO/media?maxWidthPx=1600
3. other | allowed | https://places.googleapis.com/v1/places/ChIJeTtvOGxcIpQR-Q43kTjmvFU/photos/AWCwydhMGlUlzlRrJIiyONb0KzweoHLTOe6kx7ua67MHiSdp696VtGVFeTWkKLBA3gpeazirABUyc-MdvdwGT2l7CTY0WbVT36QaOW7PbDLvxNHof-b2TngxkiTkJFMeJdUMZNnGorkjVGuVZCGupIT1_ugDmV80FA701g341xoLFTTHXX4Ij0VxNUw46wdsctgo4kSzY3cAmDsgbr8lZtSE346e3o-W838xZhRJ7tTui2EApNuBBZ5cE7so2fiNSn3_Sf0NCLkXZoZiMl3OXuSyaD7efOtlTF2d-7fAuvOPgCanRM1Ne8Z1CGix9G7UpNBt3BsKl0WynZQCj0FDfaa_VUnKcSf5qjixVw0RE2hBr0dpbJqOSwOzWL63Ot_Xunp8P3HxhGGPLpUsKV4TxObXRyEit-H1diHElgvC8eY35NkI9A/media?maxWidthPx=1600

### Sources

- https://maps.google.com/?cid=6178065919474339577&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA
- https://www.instagram.com/junazaviajes/
- https://www.facebook.com/junazaviajesok/
- https://www.agenciasturismo.com.ar/agencia/junaza-viajes-y-turismo
- https://www.tucumanturismo.gob.ar/agencias
- https://www.google.com/maps/contrib/111069480879793202467/reviews
- https://www.google.com/maps/contrib/118178525445153960533/reviews
- https://www.google.com/maps/contrib/108028855393645647194/reviews


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
  "business_id": "google-ChIJeTtvOGxcIpQR-Q43kTjmvFU",
  "slug": "junaza-viajes-y-turismo",
  "visual_mood": "fleet-utility",
  "composition": "photo-board",
  "headline": "Junaza Viajes",
  "subheadline": "Una sitio clara para convertir una busqueda local en una consulta concreta. Travel Agency en San Miguel de Tucumán con contacto, horarios, ubicacion y referencias publicas arriba del pliegue.",
  "primary_cta": "Consultar",
  "secondary_cta": "Ver ubicacion",
  "service_tags": [
    "viajes grupales, estudiantiles y de egresados",
    "Atencion en local",
    "Consulta directa",
    "Ubicacion en San Miguel de Tucumán"
  ],
  "proof_points": [
    "4.3 sobre 5 con 24 reseñas",
    "Horario: Lunes a Sabado; Domingo cerrado",
    "Direccion: Gral. José de San Martín 667 Piso 3 Of F, T4000 San Miguel de Tucumán",
    "Reseñas que destacan: \"Excelente atención y más por sus propios dueños, precios de viajes acorde a la situación,  m...\""
  ],
  "resource_title": "Datos claros para decidir",
  "resource_items": [
    "Nombre, direccion y contacto en un solo lugar.",
    "Resenas: \"Excelente atención y más por sus propios dueños, precios de viajes acorde a la situaci...\".",
    "Horario registrado: Lunes a Sabado; Domingo cerrado."
  ],
  "review_heading": "Lo que valoran quienes ya fueron",
  "contact_heading": "Llegar o llamar sin vueltas",
  "image_prompt": "Escena editorial realista para travel agency en San Miguel de Tucumán, fachada de local barrial y herramientas de trabajo, luz natural, usable como imagen generica de apoyo si las fotos reales son pobres, sin texto, sin logos, sin marcas ni datos inventados del negocio.",
  "design_notes": "Mood fleet-utility, composicion photo-board, template de conversion editorial-local-story, tono comercial practical-workshop. Evitar estetica SaaS generica; usar recursos visuales del rubro travel agency, direccion, prueba social, paquetes editables y CTA de turno.",
  "conversion_template": "editorial-local-story",
  "design_brief": {
    "market_position": "Junaza Viajes debe vender una consulta concreta de travel agency para personas que ya estan cerca de decidir, no una presentacion institucional.",
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
      "Mostrar horario publicado como dato operativo: Lunes a Sabado; Domingo cerrado.",
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
        "title": "4.3 / 5",
        "body": "24 resenas registradas en las fuentes disponibles.",
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
        "title": "Lunes a Sabado; Domingo cerrado",
        "body": "Horario publicado para orientar la primera consulta.",
        "meta": "Dato verificado",
        "is_demo": false
      },
      {
        "label": "Contacto",
        "title": "Telefono directo",
        "body": "CTA preparado para llamar desde el celular sin buscar el dato en otro lado.",
        "meta": "0381 430-7696"
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
        "title": "viajes grupales, estudiantiles y de egresados",
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
          "viajes grupales, estudiantiles y de egresados",
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
      "title": "Junaza Viajes: el proximo paso es simple",
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
        "value": "4.3 / 5",
        "note": "Dato verificado"
      },
      {
        "label": "Rubro",
        "value": "Travel Agency",
        "note": "Base verificada"
      },
      {
        "label": "Agenda",
        "value": "Lunes a Sabado; Domingo cerrado",
        "note": "Dato verificado"
      },
      {
        "label": "Contacto",
        "value": "Telefono directo",
        "note": "0381 430-7696"
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
            "value": "viajes grupales, estudiantiles y de egresados",
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
            "value": "4.3 / 5",
            "note": "24 resenas registradas en las fuentes disponibles."
          },
          {
            "label": "Rubro",
            "value": "Travel Agency",
            "note": "El sitio debe vender el servicio principal sin sumar prestaciones no confirmadas."
          },
          {
            "label": "Agenda",
            "value": "Lunes a Sabado; Domingo cerrado",
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
        "title": "Junaza Viajes: el proximo paso es simple",
        "body": "Llama, confirma disponibilidad y lleva el auto con el dato clave ya resuelto: travel agency, direccion y horario.",
        "items": [
          {
            "label": "CTA",
            "value": "Consultar",
            "note": "0381 430-7696"
          },
          {
            "label": "Ubicacion",
            "value": "Gral. José de San Martín 667 Piso 3 Of F, T4000 San Miguel de Tucumán, Tucumán, Argentina"
          },
          {
            "label": "Horario",
            "value": "Lunes a Sabado; Domingo cerrado"
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
  - `source_dir`: source folder kept inside this repo, for example `data/frontends/argentina-agencias-de-viajes-y-turismo/junaza-viajes-y-turismo`
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
