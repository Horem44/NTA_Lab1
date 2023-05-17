FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm install typescript -g

RUN npm install

COPY . .

CMD ["npm", "run", "start", "1234"]