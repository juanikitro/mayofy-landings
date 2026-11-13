# Railway publication

Production: https://landings.juanikitro.com

The production/ directory is the versioned public artifact. Railway builds Dockerfile and serves that directory through Caddy. Pushes to main affecting production/**, Dockerfile, Caddyfile or .dockerignore trigger publication.

.github/workflows/publish-railway.yml generates and validates the complete catalog, then commits production/ to main. GOOGLE_PLACES_API_KEY is used only by generation. No Vercel CLI or Supabase cloud deployment runs in this workflow. The old scripts/deploy-generated.mjs command exits without deploying, with instructions for the replacement flow.

Existing 40 landings were migrated byte-for-byte apart from explicitly documented own-domain replacements. Do not regenerate the catalog merely to test hosting. The initial workflow migration skips Actions to preserve that artifact. Generation with external Google Places calls still requires a normal content update or an intentional manual workflow run.

Rollback: select a verified Railway deployment or revert the artifact commit. ShineApp and domain registration remain outside this migration. Never store private keys in production/.
