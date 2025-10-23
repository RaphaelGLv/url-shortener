# Build stage
FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

COPY apps/api ./apps/api

RUN pnpm --filter @url-shortener/api install
RUN pnpm --filter @url-shortener/api build

RUN pnpm prune --prod

# Production stage
FROM node:22-alpine AS production
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/apps/api/node_modules ./
COPY --from=builder /usr/src/app/apps/api/dist ./dist

EXPOSE 3001

CMD ["node", "dist/index.js"]