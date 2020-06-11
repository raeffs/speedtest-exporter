FROM node:latest
WORKDIR /source
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn nx build --prod
EXPOSE 9112
CMD [ "node", "dist/apps/speedtest-exporter/main.js" ]
