#!/bin/bash
set -e

if [[ "$1" =~ "dev" ]]; then
    if [[ ! -d "node_modules" ]]; then
      npm install
    fi
    if [[ ! -z "${VUE_API_BACKEND}" ]]; then
      # this is the busybox version of sed
      sed -i s/localhost/${VUE_API_BACKEND}/ vue.config.js
    fi
    npm run serve
fi

exec "$@"
