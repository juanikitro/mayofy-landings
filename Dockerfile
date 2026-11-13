FROM caddy:2.10.2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY production /srv
RUN find /srv -type f \( -name '*.html' -o -name '*.txt' -o -name '*.xml' -o -name '*.json' -o -name '*.js' \) -exec sed -i 's#https://mayofy-landings.vercel.app#https://landings.juanikitro.com#g;s#https://mayofy.vercel.app#https://mayofy.juanikitro.com#g' {} +
ENV PORT=8080
EXPOSE 8080
