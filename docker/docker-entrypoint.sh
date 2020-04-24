#!/bin/bash
set -e

if [[ "$1" =~ "dev" ]]; then
    if [[ ! -d "node_modules" ]]; then
     npm install
    fi
    if [[ -z "${VUE_API_BACKEND}" ]]; then
      sed -i .bak s/localhost/${VUE_API_BACKEND}/ vue.config.js
    npm run serve
fi

exec "$@"
