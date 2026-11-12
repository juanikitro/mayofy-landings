FROM caddy:2.10.2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY production /srv
ENV PORT=8080
EXPOSE 8080
