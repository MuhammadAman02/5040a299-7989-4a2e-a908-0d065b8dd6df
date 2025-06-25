# Stage 1: Build
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package definitions and install deps
COPY package.json package-lock.json* ./
RUN npm install 

# Copy all source code and Prisma schema
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript project
RUN npm run build
# -------------------------------------

# Stage 2: Runtime
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy dependencies and built code
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env

RUN npm install -g serve
# Generate Prisma client again (optional but ensures type safety)
RUN npx prisma generate

# Expose port (match your Fastify server)
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
