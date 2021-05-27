var express = require('express');
var app = express();
var mongoose = require('mongoose')
var cors = require('cors')
var path = require('path');

global.appRoot = path.resolve(__dirname);

var PORT = 3000;

mongoose.connect('mongodb://localhost:27017/rankMe', { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false },function (err){
    if (err) throw err;
    console.log("Successfully connected to MongoDB")
});

app.use(cors())

app.use(express.json());

const routes = require('./src/routes/routes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, function () {
    console.log('Node API server started on port '+PORT);
});
