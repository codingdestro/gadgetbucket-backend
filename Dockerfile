# use the official Bun image
FROM oven/bun:1 as base
WORKDIR /usr/app

# install dependencies into temp directory

COPY package.json bun.lockb .
RUN  bun install --frozen-lockfile

COPY ./src .

RUN bun build ./main.ts --outdir ./dist --target "bun"
FROM oven/bun:latest 
WORKDIR /app 
COPY --from=base /usr/app/dist .
EXPOSE 5555
ENTRYPOINT [ "bun", "run", "dist/main.js" ]
