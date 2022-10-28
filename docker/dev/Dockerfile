FROM ubuntu:22.04

# RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash

RUN apt update && apt install -y --no-install-recommends \
    build-essential \
    nodejs \
    npm

ADD . /app
WORKDIR /app

# This will not be reflected if the local dev environment in mounted in
# /app; it will require an extra npm install
RUN npm install

EXPOSE 8080

COPY ./docker/docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
