#!/usr/bin/env bash

RESET=$(tput sgr0)
LEVEL_STEP=$(tput setaf 2)
LEVEL_ALERT=$(tput setaf 3)
LEVEL_ERROR=$(tput setaf 9)

echo "${LEVEL_STEP}🙇 Starting${RESET}"

##

shopt -s expand_aliases

if ! command -v docker &> /dev/null
then
  if ! command -v podman &> /dev/null
  then
    echo "${LEVEL_ERROR}🛑 Docker/Podman could not be found${RESET}"
    exit 1
  fi
  alias docker=podman
fi

##

echo "${LEVEL_STEP}🚧 Building Container Image${RESET}"

docker image build -t hms_frontend:dev -f Dockerfile.dev .

echo "${LEVEL_STEP}✅ Container Image Built${RESET}"

##

echo "${LEVEL_STEP}🚧 Removing Running Container${RESET}"

docker rm -f -i hms_frontend

echo "${LEVEL_STEP}✅ Container Removed${RESET}"

##

echo "${LEVEL_STEP}🚧 Starting Container${RESET}"

docker run \
  --name hms_frontend \
  --mount type=bind,source="$(pwd)"/public,target=/hms/public \
  --mount type=bind,source="$(pwd)"/src,target=/hms/src \
  --mount type=bind,source="$(pwd)"/vite.config.js,target=/hms/vite.config.js \
  --mount type=bind,source="$(pwd)"/postcss.config.js,target=/hms/postcss.config.js \
  --mount type=bind,source="$(pwd)"/tailwind.config.js,target=/hms/tailwind.config.js \
  --mount type=bind,source="$(pwd)"/index.html,target=/hms/index.html \
  --mount type=bind,source="$(pwd)"/configs,target=/hms/configs \
  -p 5173:5173 \
  --detach \
  hms_frontend

echo "${LEVEL_STEP}✅ Container Started${RESET}"

##

echo "
*************************************************************
* 💡 To view logs      : ${LEVEL_ALERT}docker logs --follow hms_frontend${RESET}  *
* 💡 To stop container : ${LEVEL_ALERT}docker stop -i hms_frontend${RESET}        *
*************************************************************
"

echo "${LEVEL_STEP}👋 Bye${RESET}"
