#!/usr/bin/env bash

shopt -s expand_aliases

if ! command -v docker &> /dev/null
then
  if ! command -v podman &> /dev/null
  then
    echo "docker/podman could not be found"
    exit 1
  fi
  alias docker=podman
fi

##

docker image build -t hms_frontend:dev -f Dockerfile.dev .

##

docker rm hms_frontend -f

docker run \
  --name hms_frontend \
  --mount type=bind,source="$(pwd)"/public,target=/hms/public \
  --mount type=bind,source="$(pwd)"/src,target=/hms/src \
  -p 5173:5173/tcp \
  --detach \
  hms:dev
