User = require("../models/user");

//we could filter for city too, to see the top only in a specific city
exports.getMatch = function (req, res) {
    let numberOfPeople;
    User.collection.countDocuments({}, function( err, count){
        numberOfPeople = count
    })
    // Returns a random integer from 0 to numberOfPeople:
    const rand = Math.floor(Math.random() * numberOfPeople);
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
                        _id:{$ne:user1._id}
                    }
                ]}).then(user2 => {
                    //console.log("SECONDO UTENTE")
                    //console.log(user2)
                    res.send({user1, user2})
            })
        })
}
