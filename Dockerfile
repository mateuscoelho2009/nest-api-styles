FROM node:10.16.0-alpine AS builder
# Hides opencollective message
ENV OPENCOLLECTIVE_HIDE="true"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prestart:prod

FROM node:10.16.0-alpine
# Hides opencollective message
ENV OPENCOLLECTIVE_HIDE="true"
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD node dist/main.js
