FROM node:14.8.0-alpine3.12

WORKDIR /front

COPY . .

RUN yarn --frozen-lockfile

EXPOSE 8080 8080

CMD yarn serve
