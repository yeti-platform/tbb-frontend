#!/bin/bash
set -e

if [[ "$1" =~ "dev" ]]; then
    if [[ ! -d "node_modules" ]]; then
    # This needs to live here if we want node_modules to be actually shipped
    # to the host filesystem
      npm install
    fi
    if [[ ! -z "${VUE_API_BACKEND}" ]]; then
      # this is the busybox version of sed
      sed -i s/127.0.0.1/${VUE_API_BACKEND}/ vue.config.js
    fi
    npm run serve
fi

exec "$@"
