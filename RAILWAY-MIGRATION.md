# Railway publication

Public catalog: https://landings.juanikitro.com (40 landings at migration).
Production content is versioned under production/. Docker serves only that directory and replaces the former catalog and Mayofy origins with the Railway domains. ShineApp links remain unchanged because its migration is excluded.

The generation workflow rebuilds all deployable runs, runs the existing validation gates, and commits the resulting public artifact. It no longer deploys to Vercel. Its GITHUB_TOKEN needs contents:write; existing GOOGLE_PLACES_API_KEY remains scoped to generation, never Docker runtime.

Before enabling automatic publication: merge this migration branch after checks, connect Railway web to main without commit pin, and set watch patterns /production/**, /Dockerfile, /Caddyfile. Verify a generated-artifact commit triggers Railway. This end-to-end CI check is pending; the migration deploy is currently pinned.

Recovery: redeploy a previously verified Railway deployment or pin its commit. The initial production/ artifact preserves the complete source. Do not delete the Vercel origin until joint acceptance.
