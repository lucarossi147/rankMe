FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app
RUN export PORT=5000
RUN HTTPS=true
CMD ["react-script", "start"]
