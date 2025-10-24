# Use the official Node.js image as the base image
FROM node:22-alpine

RUN npm i -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Setup environment variables
ENV PORT=3001

# Copy pnpm root files
COPY pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy root package.json
COPY package.json ./

# Copy package.json and package-lock.json to the working directory
COPY /apps/api/package*.json ./apps/api/

# Install the application dependencies
RUN pnpm --filter @url-shortener/api install

# Copy the rest of the application files
COPY /apps/api ./apps/api

# Build the NestJS application
RUN pnpm --filter @url-shortener/api build

# Prune dev dependencies
RUN pnpm --dir=apps/api prune --prod
# Expose the application port
EXPOSE 3001

# Command to run the application
CMD ["node", "apps/api/dist/main"]