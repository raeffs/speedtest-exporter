FROM node:latest as builder
WORKDIR /source
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn nx build --prod

FROM node:latest
WORKDIR /app
RUN yarn add express speedtest-net tslib rxjs
COPY --from=builder /source/dist/apps/speedtest-exporter/ .
EXPOSE 9112
CMD [ "node", "main.js" ]
