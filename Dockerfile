FROM node as build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn
RUN npm run build:prod
# RUN npm run build:express



FROM node:alpine

ENV NODE_ENV production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/src/server.js /usr/src/app/dist/express/server.js
RUN npm install --production

ENV HOST 0.0.0.0
EXPOSE 9090

# start command
CMD [ "node", "/usr/src/app/dist/express/server.js" ]
