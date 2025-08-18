# Use slim Node image (small but with glibc)
FROM node:20.10-slim

# Install only required system dependencies
RUN apt-get update && apt-get install -y \
  curl \
  bash \
  openssl \
  wget \
  ca-certificates \
  gnupg \
  dos2unix \
  unzip \
  apt-transport-https \
  && rm -rf /var/lib/apt/lists/*

# (Optional) Install Doppler CLI if you actually use it
RUN curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | \
    gpg --dearmor -o /usr/share/keyrings/doppler-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/doppler-archive-keyring.gpg] https://packages.doppler.com/public/cli/deb/debian any-version main" > /etc/apt/sources.list.d/doppler-cli.list && \
    apt-get update && apt-get install -y doppler && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy dependencies first (better caching)
COPY package.json package-lock.json ./

RUN npm install --omit=dev

# Copy rest of the app
COPY . .

# Build Next.js
RUN npm run build

# Set runtime environment variables
ARG NEXT_PUBLIC_APP_URL
ARG API_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_KEY

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV API_URL=$API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_KEY=$NEXT_PUBLIC_SITE_KEY
ENV PORT=3000

EXPOSE 3000

# Use Next.js production server
CMD ["npm", "start:prod"]
