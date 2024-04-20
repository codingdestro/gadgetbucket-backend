# use the official Bun image
FROM oven/bun:1 as base
WORKDIR /usr/app

# install dependencies into temp directory

COPY package.json bun.lockb .
RUN  bun install --frozen-lockfile 
RUN mkdir src

COPY src ./src/

RUN bun build ./src/main.ts --outdir ./dist --target "bun"

# USER bun
EXPOSE 5555
ENTRYPOINT [ "bun", "run", "dist/main.js" ]
