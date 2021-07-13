FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY default-user-image.jpg /app/images/
COPY images/* /app/images/

COPY . /app

RUN export PORT=5000
RUN HTTPS=true
CMD ["node", "index.js"]
