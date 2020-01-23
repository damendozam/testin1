@ECHO OFF
ECHO Running ws-server image with the current folder pointing outside !
docker network create ws
docker run --expose 8080 -p 0.0.0.0:8080:8080 -it --rm --name ws-server -t ws-server node /app/main.js %1%
PAUSE