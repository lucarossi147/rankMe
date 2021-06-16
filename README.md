# rankMe

Progetto applicazioni e servizi web

Per server e client entrare nella rispettiva cartella, per lanciare entrambi entrare in /server
Per lanciare il server:

#npm run server

Per il client:

#npm run client

Per entrambi:

#npm run dev

Per lanciare l'intero applicativo usando docker-compose:

Prima di compilare le immagini, assegnare nel file index.js "DOCKER_DB" come URI di connessione al db Mongo, altrimenti 
non funzionerà perchè il server non riuscirà a contattare correttamente il db.

docker-compose build
docker-compose -f  up -d

Questo comando lancierà tre container, client server e un database mongodb
Tutti e tre condividono una rete, "interna" sulla quale il client comunica con il server
e il server con il DB

#todo 

Implementare pagina di rank
Implementare dashboard, dove l'utente può votare delle foto proposte
Implementare profilo utente

http: authorization header Bearer accessToken 
