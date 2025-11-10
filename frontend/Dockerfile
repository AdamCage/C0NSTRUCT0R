FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci --no-audit --no-fund
RUN npm run build