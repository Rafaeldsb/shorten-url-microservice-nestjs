FROM node:14-alpine

WORKDIR /app

COPY --chown=node:node . /app

USER node

EXPOSE 3000

CMD ["yarn", "start:prod"]
