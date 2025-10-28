# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

WORKDIR /app
ENV NODE_ENV=development
ENV PATH="/app/node_modules/.bin:${PATH}"

COPY package.json package-lock.json ./

COPY apps/web/package.json apps/web/package.json

RUN npm ci --workspace web

COPY apps/web apps/web

EXPOSE 5173

CMD ["npm", "--workspace", "web", "run", "dev"]
