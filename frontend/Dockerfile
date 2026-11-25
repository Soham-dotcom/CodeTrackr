# CodeTrackr website for a single-server deploy (deploy/aws).
# Builds the static site, then serves it with Caddy, which also forwards /api and /auth
# to the API container and gets an HTTPS certificate automatically.
#
#   docker build -t codetrackr-web frontend

FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY --from=build /app/dist /srv
