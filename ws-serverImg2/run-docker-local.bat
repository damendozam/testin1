@ECHO OFF
ECHO Running ws-server image with the current folder!
docker network create ws
docker run --net ws -it --rm --name ws-server -t ws-server node /app/main.js
PAUSE