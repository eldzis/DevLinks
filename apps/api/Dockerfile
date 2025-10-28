# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app

RUN apk add --no-cache curl

ENV PATH="/app/node_modules/.bin:${PATH}"

COPY package.json package-lock.json ./

COPY apps/api/package.json apps/api/package.json

RUN npm ci --workspace api

COPY apps/api apps/api

RUN npm --workspace api run prisma:generate

EXPOSE 3000
CMD ["npm", "--workspace", "api", "run", "start:dev"]
