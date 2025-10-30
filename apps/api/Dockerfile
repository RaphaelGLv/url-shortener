# Use the official Node.js image as the base image
FROM node:22-alpine AS base

RUN npm i -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Setup environment variables
ENV PORT=3001

# Dev stage
FROM base AS deps

# Copy pnpm root files
COPY pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy root package.json
COPY package.json ./

# Copy package.json and package-lock.json to the working directory
COPY /apps/api/package*.json ./apps/api/

# Install all dependencies
RUN pnpm --filter @url-shortener/api install

# Builder stage
FROM deps AS builder

# Copy the rest of the application files
COPY /apps/api ./apps/api

# Build the NestJS application
RUN pnpm --filter @url-shortener/api build

# Production stage
FROM base AS runner
ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/apps/api/dist ./apps/api/dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/apps/api/node_modules ./apps/api/node_modules

# Expose the application port
EXPOSE 3001

# Command to run the application
CMD ["node", "apps/api/dist/main"]