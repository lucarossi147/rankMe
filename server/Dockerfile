FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY images/default-user-image.jpg /app/images/
COPY . /app
RUN export PORT=5000
RUN HTTPS=true
CMD ["node", "index.js"]
