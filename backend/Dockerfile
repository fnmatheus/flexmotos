FROM node:20.9.0-alpine3.18

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY package*.json .
RUN npm ci

COPY . .

WORKDIR /usr/app/src

RUN mkdir contracts
RUN mkdir uploads

WORKDIR /usr/app

CMD ["npm", "start"]