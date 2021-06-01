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

docker-compose -f docker-compose.yml up -d

Questo comando lancierà tre container, client server e un database mongodb
Tutti e tre condividono una rete, "interna" sulla quale il client comunica con il server
e il server con il DB
