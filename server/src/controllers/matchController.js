User = require("../models/user");
Vote = require('../models/vote')

//we could filter for city too, to see the top only in a specific city
exports.getMatch = function (req, res) {
    let numberOfPeople;
    User.collection.countDocuments({}, function( err, count){
        numberOfPeople = count
    })
    // Returns a random integer from 0 to numberOfPeople:
    const rand = Math.floor(Math.random() * numberOfPeople);
    //vale la stessa  cosa che dico sotto
    //==>quindi si va da 0 a numberOfPeople-1, yup
    User.findOne().skip(rand)
        .then(user1 => {
            //console.log("PRIMO UTENTE")
            //console.log(user1)
            const from = user1.numberOfVotes - 10
            const to = user1.numberOfVotes + 10
            User.findOne({
                $and:[
                    {
                        numberOfVotes:{$gte:from, $lte:to}
                    },
                    {
                        //TODO dovrei aggiungere $ne: id della persona che fa la richiesta (chi vota non deve vedere il proprio profilo
                        //==> $ne:req.user._id
                        _id:{$ne:user1._id}
                    }
                ]}).then(user2 => {
                    //console.log("SECONDO UTENTE")
                    //console.log(user2)
                    res.send({user1, user2})
            })
        })
}

//TODO ELIMINARE DALLA FACCIA DELLA TERRA RANKPOSITION

//potremmo usarlo come middleware, mandi il voto e ti ritorna una coppia di utenti
exports.winner = function (req, res){
    const userId = req.body.userId
    Vote.create({ user: req.user._id, date:Date.now() }, function (err, newVote) {
        if (err) return res.sendStatus(500);
        const filter = { "_id": userId };
        const update = { $push: { votes: newVote }, $inc:{numberOfVotes:1} };
        User.findOneAndUpdate(filter, update ).then(user=>{
            if (!user) return res.sendStatus(500)
            res.sendStatus(200)
        })
    });
}

