# San Miguel Agent Briefs

Use these briefs from a Codex/Claude session to rewrite the configured site specs file.

- city: San Miguel
- segment: gastronomia y eventos
- specs: data/site-specs/san-miguel-alta-conversion-site-specs.json

Recommended flow:

```powershell
npm run agent:briefs -- --input data/san-miguel-alta-conversion-businesses.json --specs data/site-specs/san-miguel-alta-conversion-site-specs.json --out data/agent-briefs/san-miguel-alta-conversion --city "San Miguel" --segment "gastronomia y eventos"
# Agent edits data/site-specs/san-miguel-alta-conversion-site-specs.json
npm run validate:specs -- --businesses data/san-miguel-alta-conversion-businesses.json --specs data/site-specs/san-miguel-alta-conversion-site-specs.json
npm run generate:preview -- data/san-miguel-alta-conversion-businesses.json --specs data/site-specs/san-miguel-alta-conversion-site-specs.json --session san-miguel-gastronomia-y-eventos
npm run generate -- data/san-miguel-alta-conversion-businesses.json --specs data/site-specs/san-miguel-alta-conversion-site-specs.json --session san-miguel-gastronomia-y-eventos
npm run qa -- --session san-miguel-gastronomia-y-eventos
```

Remake flow for an existing weak batch:

```powershell
npm run agent:briefs -- --input <businesses.json> --specs <site-specs.json> --out <briefs-dir> --city "San Miguel" --segment "gastronomia y eventos" --remake-from <generated-run-dir> --screenshots <screenshots-dir>
```

Each remake brief includes current HTML/CSS excerpts and screenshot paths when available. Replace the frontend instead of preserving a weak structure.

Businesses:

1. [ALTOS -food concept-](./altos-food-concept.md)
2. [Baum San Miguel](./baum-san-miguel.md)
3. [PATO'S](./pato-s.md)
4. [Parrilla Adry](./parrilla-adry.md)
5. [Federico Eventos](./federico-eventos.md)
