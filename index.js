const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');

global.appRoot = path.resolve(__dirname);

const PORT = 3000;
const DB = 'mongodb://localhost:27017/rankMe';

mongoose.
connect(DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },function (err){
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

app.listen(PORT, () => {
    console.log('Node API server started on port '+PORT);
});
