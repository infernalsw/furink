FROM node:22-alpine AS base

# node-gyp-build
RUN apk add --no-cache --update build-base


ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm

# Install pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i -g turbo

FROM base as builder
WORKDIR /app

COPY . .
RUN turbo prune @furinkapp/backend --docker

# add lockfile and package.json's of isolated subworkspace
FROM base as installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml .
COPY --from=builder /app/services/backend/prisma/schema.prisma services/backend/prisma/schema.prisma
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i
# todo: make frozen. --frozen-lockfile

# build backend
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/turbo.json .
RUN turbo run build --filter=@furinkapp/backend

FROM base as runner
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/services/backend/prisma/schema.prisma services/backend/prisma/schema.prisma

# don't run husky
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --prod
#--frozen-lockfile

# don't run as root
RUN addgroup -S -g 1001 furink && \
    adduser -DH -G furink furink
USER furink

COPY --from=installer --chown=furink:furink /app/services/backend/dist /app/services/backend/dist

CMD ["node", "services/backend/dist/main.js"]
