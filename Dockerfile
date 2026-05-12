# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS install
WORKDIR /app

# install dependencies into temp directory
# this will cache them and speed up future builds
RUN mkdir -p /temp/packages
COPY package.json bun.lockb /temp/packages/
RUN cd /temp/packages && bun install --frozen-lockfile

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM oven/bun:1 AS build
WORKDIR /app
COPY --from=install /temp/packages/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# deploy via nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
