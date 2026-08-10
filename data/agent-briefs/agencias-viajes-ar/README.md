# Argentina Agent Briefs

Use these briefs from a Codex/Claude session to rewrite the configured site specs file.

- city: Argentina
- segment: agencias de viajes y turismo
- specs: data/site-specs/agencias-viajes-ar-site-specs.json

Recommended flow:

```powershell
npm run agent:briefs -- --input data/agencias-viajes-ar-businesses.json --specs data/site-specs/agencias-viajes-ar-site-specs.json --out data/agent-briefs/agencias-viajes-ar --city "Argentina" --segment "agencias de viajes y turismo"
# Agent edits data/site-specs/agencias-viajes-ar-site-specs.json
npm run validate:specs -- --businesses data/agencias-viajes-ar-businesses.json --specs data/site-specs/agencias-viajes-ar-site-specs.json
npm run generate:preview -- data/agencias-viajes-ar-businesses.json --specs data/site-specs/agencias-viajes-ar-site-specs.json --session argentina-agencias-de-viajes-y-turismo
npm run generate -- data/agencias-viajes-ar-businesses.json --specs data/site-specs/agencias-viajes-ar-site-specs.json --session argentina-agencias-de-viajes-y-turismo
npm run qa -- --session argentina-agencias-de-viajes-y-turismo
```

Remake flow for an existing weak batch:

```powershell
npm run agent:briefs -- --input <businesses.json> --specs <site-specs.json> --out <briefs-dir> --city "Argentina" --segment "agencias de viajes y turismo" --remake-from <generated-run-dir> --screenshots <screenshots-dir>
```

Each remake brief includes current HTML/CSS excerpts and screenshot paths when available. Replace the frontend instead of preserving a weak structure.

Businesses:

1. [Sauco Viajes](./sauco-viajes.md)
2. [Almendra Viajes Salta](./almendra-viajes-salta.md)
3. [Tienda de Viajes](./tienda-de-viajes.md)
4. [Viq Viajes](./viq-viajes.md)
5. [Junaza Viajes](./junaza-viajes-y-turismo.md)
