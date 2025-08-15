# syntax=docker/dockerfile:1

# -------- Deps (install all deps for build) --------
    FROM node:20-slim AS deps
    WORKDIR /app
    
    # install dependencies using lockfile
    COPY package*.json ./
    # COPY .npmrc ./.npmrc   # uncomment if you use a private registry
    RUN npm ci
    
    # -------- Build (compile Next.js) --------
    FROM node:20-slim AS builder
    WORKDIR /app
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    RUN npm run build
    
    # -------- Runtime (prod only) --------
    FROM node:20-slim AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    ENV PORT=3000
    
    # create non-root user
    RUN addgroup --system --gid 1001 nodejs \
     && adduser  --system --uid 1001 --ingroup nodejs nextjs
    
    # install only production deps for a slim image
    COPY package*.json ./
    RUN npm ci --omit=dev
    
    # copy build artifacts
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    # (optional) copy next config if your start script relies on it
    # COPY --from=builder /app/next.config.js ./next.config.js
    ARG NEXT_PUBLIC_APP_URL
    ARG API_URL
    ARG NEXT_PUBLIC_API_URL
    ARG NEXT_PUBLIC_SITE_KEY

    ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    ENV API_URL=${API_URL}
    ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
    ENV NEXT_PUBLIC_SITE_KEY=${NEXT_PUBLIC_SITE_KEY}    
    
    USER nextjs
    EXPOSE 3000
    
    # must map to "next start" in package.json ("start": "next start")
    CMD ["npm", "start:prod"]
    