FROM node:lts-alpine

RUN apk add --no-cache bash

ADD . /app
WORKDIR /app

EXPOSE 8080

COPY ./docker/docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD [ "dev" ]
