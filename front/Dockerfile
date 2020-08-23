FROM node:14.8.0-alpine3.12

WORKDIR /front

COPY . .

RUN yarn --frozen-lockfile

EXPOSE 3001 3001

CMD yarn serve
