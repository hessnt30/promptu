# Base image
FROM node:23 AS base

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm i
# Copy backend code
COPY . .

# Production image
FROM base AS prod

ENV NODE_PATH=./build

RUN npm run build
