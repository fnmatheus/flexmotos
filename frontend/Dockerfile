FROM node:20.9.0-alpine3.18

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]