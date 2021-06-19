const NodeGeocoder = require('node-geocoder');
User = require('../models/user')
const options = {
    provider: 'openstreetmap'//,
    //apiKey:"rGsNQBjK2657PGBVqJJKCQPvDHX7PauG"
};

const geocoder = NodeGeocoder(options);

//2 modi per accedere:
//1 con lat, long, se si registra fuori casa non worka, serve un modo per cambiarlo
//2 con indirizzo, serve un form con via, numero civico e citta
//se lo si fa lato client si possono far vedere le info lettera per lettera,e una volta scelto si manda il coso al server, piu' leggero e usabile

exports.testGeoCode = function (req, res) {
    //geocoder.reverse({lat:45.464664 ,lon: 9.188540})
    geocoder.geocode('Castel bolognese')
        .then(geo => {
            res.send(geo)
        })
}

exports.createAddress = function (req, res) {
    console.log(req.user)
    User.findByIdAndUpdate(req.user._id, {city: req.body.city, state: req.body.state, country: req.body.country},(err, user)=>{
        if (err) return res.status(500).send(err)
        if (!user) return res.sendStatus(404)
        res.sendStatus(200)
    })
}
