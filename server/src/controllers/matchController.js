User = require("../models/user");
Vote = require('../models/vote')
const randomUtil = require('./randomUtility')

const VOTES_RANGE = 10

//TODO we could filter for city too, to see the top only in a specific city
exports.getMatch = function (req, res) {
    User.collection.countDocuments({}, function( err, numberOfPeople){
        // console.log(count)
        // Returns a random integer from 0 to numberOfPeople-1:
        // console.log(numberOfPeople)
        // const rand = Math.floor(Math.random() * numberOfPeople-1);
        // console.log(numberOfPeople)
        const randomNumber = randomUtil.getRandom()
        const rand = Math.floor( randomUtil.getRandom() * (numberOfPeople-1));
        // console.log("rand "+rand)
        const myId = req.user._id
        //get first random profile
        User.findOne({_id:{$ne:myId}}).skip(rand)
            .then(user1 => {
                // console.log("FIRST USER")
                // console.log(user1.username)
                const from = user1.numberOfVotes - VOTES_RANGE
                const to = user1.numberOfVotes + VOTES_RANGE
                //get second profile within a vote_range
                User.findOne({
                    $and:[{
                        numberOfVotes:{$gte:from, $lte:to}
                    },{
                        _id:{$nin: [user1._id,myId]}
                    }]
                }).then(user2 => {
                    if (!user2) {
                        //if we didn't find anything return a random user

                        //it's not that random, maybe we should add a field numberOfTimesAppearedInMatch to use both to sort and use the person who appeared less, and for the analytics
                        User.findOne({_id:{$nin: [user1._id,myId]}})
                            .then(backup => {
                                if(!backup) res.sendStatus(500)
                                const user2 = backup
                                User.updateMany({_id :{$in: [user1._id,myId]}}, { $push: { notifies: "ppeared"}}).then(()=>{})
                                return res.send({user1, user2})
                            })
                    } else {
                        // console.log("SECOND USER")
                        // console.log(user2.username)
                        User.updateMany({_id :{$in: [user1._id,myId]}}, { $push: { notifies:"appeared"}}).then(()=>{})
                        res.send({user1, user2})
                    }
                })
            })
    })

}

//potremmo usarlo come middleware, mandi il voto e ti ritorna una coppia di utenti
exports.winner = function (req, res){
    const userId = req.body.userId
    Vote.create({ user: req.user._id, date:Date.now() }, function (err, newVote) {
        if (err) return res.sendStatus(500);
        const update = { $push: { votes: newVote, notifies: "voted" }, $inc:{numberOfVotes:1} };
        User.findByIdAndUpdate(userId, update ).then(user=>{
            if (!user) return res.sendStatus(500)
            res.sendStatus(200)
        })
    });
}

