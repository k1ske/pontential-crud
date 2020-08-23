FROM node:14.8.0-alpine3.12
ARG WAIT_VERSION
ARG WAIT_HOSTS
ENV WAIT_HOSTS $WAIT_HOSTS

WORKDIR /server

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

RUN yarn --frozen-lockfile

CMD wait && \
    sleep 2 && \
    yarn add sequelize-cli && \
    yarn db:migrate && \
    yarn db:seed && \
    yarn test
