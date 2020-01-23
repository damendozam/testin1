@ECHO OFF
ECHO Building ws-server image!
docker build --rm -f "Dockerfile" -t ws-server:latest .