FROM node:lts

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --prod

copy lib /app/lib

CMD [ "yarn", "start" ]
