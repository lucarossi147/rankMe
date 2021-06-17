User = require("../models/user");

exports.getMatch = function (req, res) {
    let numberOfPeople;
    User.collection.countDocuments({}, function( err, count){
        numberOfPeople = count
    })
    // Returns a random integer from 0 to numberOfPeople:
    const rand = Math.floor(Math.random() * numberOfPeople);
    User.findOne().skip(rand)
        .then(user1 => {
            console.log("PRIMO UTENTE")
            console.log(user1)
            const numberOfVotes = user1.numberOfVotes
            User.findOne({
                $and:[
                    {
                        numberOfVotes:{$gte:10, $lte:10}
                    },
                    {
                        _id:{$ne:"60c9d7f0773bcf89e6c5b5a4"}
                    }
                ]}).then(user2 => {
                    console.log("SECONDO UTENTE")
                    console.log(user2)
                    res.send({user1, user2})
            })
        })
}
