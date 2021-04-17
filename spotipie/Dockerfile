FROM node:14.1-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . /app
RUN ng build --prod

CMD ng serve --host 0.0.0.0
