FROM node:alpine

WORKDIR /app
COPY . .

RUN apk add --no-cache --virtual .gyp python make g++ 

RUN npm ci

EXPOSE 8080

# ENTRYPOINT ["node", "main.js"]
