FROM node:22-alpine AS base

# Install pnpm in the base image so it's available in subsequent stages
RUN npm install -g pnpm

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Copy the web app source
COPY apps/web ./apps/web

# Install dependencies directly into the web package directory
RUN pnpm --dir=apps/web install

# Force standalone output inside the Linux builder to ensure .next/standalone is generated
ENV NEXT_FORCE_STANDALONE=true

# Build the web app
RUN pnpm --filter @url-shortener/web run build

# Production image
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy web artifacts from the builder
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/web/server.js"]
