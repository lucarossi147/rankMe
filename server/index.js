const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const https = require('https');
const fs = require('fs')
global.appRoot = path.resolve(__dirname);

// const privateKey = fs.readFileSync('./sslcer/key.pem')
// const certificate = fs.readFileSync('./sslcer/cert.pem')

const credentials = {
    key: fs.readFileSync('sslcert/key.pem'),
    cert: fs.readFileSync('sslcert/cert.pem')
}

httpsServer = https.createServer(credentials,app)

const PORT = 3000;
const LOCAL_DB = 'mongodb://localhost:27017/rankMe';
const DOCKER_DB = 'mongodb://rankme_mongodb_1.rankMe_internal:27017/rankme';

// aspetto 10 sec che il container di mongo sia su
function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); } while(curDate-date < millis);
}
//pausecomp(10000);

//connessione al db
mongoose.set('useFindAndModify', false);
mongoose.connect(
        LOCAL_DB, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('MongoDB Connected'))
          .catch((err) => console.log(err));

//TODO: risolvere problema di CORS app.use(cors), così pare che funzioni

app.use(cors());

app.use(express.json());

const routes = require('./src/routes/routes');
routes(app);

//app.use(express.static(path.join(__dirname, "..", "build")))
app.use('/images',express.static(appRoot + '/images'))
app.use(express.static("client/build"))


app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

httpsServer.listen(PORT, () => {
    console.log('Node API server started on port '+PORT);
});
