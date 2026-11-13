#!/usr/bin/env node
console.error("Direct Vercel deployment has been retired. Use the Prepare Railway landing catalog workflow in GitHub Actions, or commit the validated production/ artifact to main. Railway deploys that branch automatically.");
process.exitCode = 1;
