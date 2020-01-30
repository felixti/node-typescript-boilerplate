#Stage 1 - Create base image
FROM node:lts-alpine AS base
WORKDIR /app
COPY yarn.lock .
COPY package.json .

#Stage 2 - Create cached node_modules.
# Only rebuild layer if yarn.lock has changed
FROM base AS dependencies
RUN yarn --production
RUN cp -R node_modules prod_node_modules
RUN yarn

#Stage 3 - Create lint and test layer
FROM dependencies AS test
COPY . .
RUN yarn lint

#Stage 5 - Create build layer
FROM dependencies AS build
COPY . .
RUN yarn build

#Stage 4 - Create Release layer
FROM base AS release
COPY --from=dependencies /app/prod_node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD [ "node", "dist/server.js" ]



