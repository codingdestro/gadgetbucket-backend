# use the official Bun image
FROM oven/bun:1 as base
WORKDIR /app

# install dependencies into temp directory

COPY package.json bun.lockb .
RUN  bun install --frozen-lockfile 
RUN mkdir src

COPY src ./src/

# USER bun
EXPOSE 5555
ENTRYPOINT [ "bun", "run", "/app/src/main.ts" ]
