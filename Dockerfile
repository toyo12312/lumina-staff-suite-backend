# Етап 1: Збірка (Builder)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./


RUN npm ci --include=dev

COPY . .
RUN npm run build


RUN ls -la || echo "LISTING APP DIR"
RUN ls -la dist || echo "DIST FOLDER IS MISSING!"


FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]