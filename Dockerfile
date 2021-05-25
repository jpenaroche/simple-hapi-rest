FROM alpine:3.12

WORKDIR /home/hapi-app

RUN apk add nodejs npm curl && apk cache clean

ENV port=3000 \ 
    host=0.0.0.0 \ 
    db_name= \ 
    user= \
    password= \ 
    env=production

COPY  . . 

RUN npm i -y && npm cache clean --force && npm run compile

RUN printf "PORT=${port}\nHOST=${host}\nDB_NAME=${db_name}\nDB_USER=${user}\nDB_PASSWORD=${password}" > .env

EXPOSE ${port}/tcp

HEALTHCHECK --interval=5m --timeout=3s \
    CMD curl -f http://${host}:${port} || exit 1

ENTRYPOINT NODE_ENV=${env} node ./build/src/main.js