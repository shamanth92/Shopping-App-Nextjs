# 1. Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files and build Next.js app
COPY . .

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
