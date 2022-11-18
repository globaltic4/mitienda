FROM node:latest

WORKDIR /usr/apireserva

COPY ./ .

RUN npm install
 
EXPOSE 8081

ENTRYPOINT ["node", "index.js"]