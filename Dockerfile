FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT = 1234

EXPOSE 1234

CMD [ "npm" , "run", "prod"]