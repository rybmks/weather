FROM node:23.11-alpine AS base

RUN corepack enable

RUN apt update && apt install -y openssl

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN corepack enable
COPY --from=base /app /app
RUN pnpm install --prod --frozen-lockfile
COPY . .
RUN pnpx prisma generate --schema=shared/prisma/schema.prisma

FROM base AS build
COPY --from=prod-deps /app /app
RUN pnpm install --frozen-lockfile
RUN pnpx prisma generate --schema=shared/prisma/schema.prisma
RUN pnpm run build

FROM base AS weather
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD ["node", "dist/apps/weather/src/main"]

FROM base AS scheduler
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD ["node", "dist/apps/scheduler/src/main"]
