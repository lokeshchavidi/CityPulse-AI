# --- Build stage ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite inlines env vars at BUILD time (must be prefixed VITE_), unlike CRA
# which reads them at container start. Set this to wherever the browser
# should reach the backend from — usually just "/api" so it goes through
# the nginx proxy below rather than a container-network hostname (the
# browser can't resolve "backend", only containers on the compose network
# can). Check src/**/axios* or wherever your baseURL is configured and
# make sure it actually reads import.meta.env.VITE_API_URL — if it's
# hardcoded instead, this build arg does nothing.
ARG VITE_API_BASE_URL=/api/v1
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# --- Runtime stage ---
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
