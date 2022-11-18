FROM node:latest

WORKDIR /usr/app/
COPY ./ /usr/app/
RUN npm install
 
EXPOSE 8084

ENTRYPOINT ["node", "index.js"]