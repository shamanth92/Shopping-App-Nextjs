# 1. Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy all files and build Next.js app
COPY . .

ARG NEXT_PUBLIC_FIREBASE_CONFIG_KEY
ARG API_URL
ENV NEXT_PUBLIC_FIREBASE_CONFIG_KEY=$NEXT_PUBLIC_FIREBASE_CONFIG_KEY
ENV API_URL=$API_URL

RUN npm run build

# 2. Runner stage
FROM node:20-alpine AS prod

WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start"]
