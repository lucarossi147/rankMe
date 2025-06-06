# rankMe

Progetto applicazioni e servizi web

Per server e client entrare nella rispettiva cartella, per lanciare entrambi entrare in /server
Per lanciare il server:

` npm run server `

Per il client:

` npm run client `

Per entrambi:

` npm run dev `

Per lanciare l'intero applicativo usando docker-compose:

Prima di compilare le immagini, assegnare nel file index.js `DOCKER_DB` come URI di connessione al db Mongo, altrimenti 
non funzionerà perchè il server non riuscirà a contattare correttamente il db.

```docker-compose build
docker-compose -f  up -d
```

Questo comando lancierà tre container, client server e un database mongodb
Tutti e tre condividono una rete, "interna" sulla quale il client comunica con il server
e il server con il DB

## Dockerfile:
```
# Tell docker to use this image, node, as base image
FROM node:alpine

# Set a envirnoment variable to use later
ENV WORKINGDIR=/app
ENV PATH /app/node_modules/.bin:$PATH

#Set working directory as default for operations
WORKDIR ${WORKINGDIR}

#Copy file with dependencies for npm install
COPY package*.json ./

# Install dependencies
RUN	npm install --silent

#Bundle app source
COPY . .

#Indicate port to expose to the extern
EXPOSE 5000

#Set comand to launch at start
CMD ["npm", "run", "start"]
```
