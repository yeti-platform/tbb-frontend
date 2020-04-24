#!/bin/bash
set -e

if [[ "$1" =~ "dev" ]]; then
    if [[ ! -d "node_modules" ]]; then
     npm install
    fi
    npm run serve
fi

exec "$@"
