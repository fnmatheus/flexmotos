FROM node:20.9.0-alpine3.18

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY ./ ./

EXPOSE 3001

CMD ["npm", "run", "dev"]