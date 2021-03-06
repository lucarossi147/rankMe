User = require("../models/user");
Vote = require("../models/vote");

const fs = require('fs')
const sharp = require('sharp');

exports.setSocialMediaLink = function (req, res){
    const facebook = req.body.facebook;
    const instagram = req.body.instagram;
    const user = req.user;

    const filter = { "_id": user._id};
    let update = { }
    if (facebook && facebook.startsWith('https://www.facebook.com/')) {
        update.facebook = facebook
    }
    if (instagram && instagram.startsWith('https://www.instagram.com/')) {
        update.instagram = instagram
    }
    User.findOneAndUpdate(filter, update,{
        new: true
    }).then(doc => {
        if (!doc) { res.sendStatus(500).json({"description": "an error occurred"}) }
        //res.sendStatus(200)
        res.sendStatus(200)
    })
}


exports.setBio = function (req, res){
    const bio = req.body.bio;
    const user = req.user;

    User.findByIdAndUpdate(user._id, {"bio": bio}).then(doc => {
        if (!doc) { return res.sendStatus(500).json({"description": "an error occurred"}) }
        return res.sendStatus(200)
    })
}

exports.getProfile = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err) return res.sendStatus(500)
        User.find().sort({'numberOfVotes': -1})
            .then(rankedUsers => {
                if (!rankedUsers) return res.sendStatus(404)
                let i = 1;
                for (let u of rankedUsers){
                    //if I use _id it doesn't work
                    //console.log(JSON.stringify(u._id) === JSON.stringify(user._id))
                    if (u.username === user.username) {
                        const userToReturn = {
                            _id : user._id,
                            name : user.name,
                            surname : user.surname,
                            username : user.username,
                            email: user.email,
                            rankPosition: i,
                            admin : user.admin,
                            instagram : user.instagram,
                            facebook : user.facebook,
                            birthDate: user.birthDate,
                            bio: user.bio,
                            picture: user.picture,
                            city: user.city,
                            state: user.state,
                            country: user.country,
                            gender: user.gender
                        }
                        return res.send(userToReturn)
                    }
                    i++
                }
                return res.sendStatus(404)
            })
    })
}


exports.uploadPhoto = function (req, res){
    const fileName = req.file.filename;
    const filePath = appRoot+'/images/'
    const outputFile = Date.now().toString()+'.jpg'

    fs.unlink(filePath+req.user.picture, err => {
        if (err) return res.sendStatus(500)
    })
    try {
        sharp(filePath+fileName)
            .resize( 1024,768 , { //if we wanted classical full hd 16/9, 1920x1080
                fit:'cover'
            })
            .toFile(filePath+outputFile)
            .then(data => {
                fs.unlink(filePath+fileName, err => {
                    if (err) return res.sendStatus(500)
                })
            })
            .catch(err => {
                return res.sendStatus(500)
            });
        const filter = { "_id": req.user._id};
        const update = { "picture": outputFile };
        User.findOneAndUpdate(filter, update,{
            new: true
        }).then(doc => {
            if (!doc) { return res.sendStatus(500).json({"description": "an error occurred"}) }
            return res.sendStatus(200)
        })
    }catch(err) {
        return res.sendStatus(400);
    }
}

exports.userImage = function (req, res) {
    const userId = req.params.userId
    User.findById(userId, function (err, user) {
        if (err) return res.sendStatus(500)
        if (!user) return res.sendStatus(500)
        res.send({userImage: user.picture})
    })
}

exports.rank = function(req, res){
    const user = req.user
    const city = req.query.city
    const state = req.query.state
    const country = req.query.country
    const age = req.query.age
    const gender = req.query.gender

    let numberOfPeopleToRank
    if(req.query.n){
        numberOfPeopleToRank = req.query.n
    } else {
        numberOfPeopleToRank = 10
    }

    let filter = {}
    if (gender) {
        filter["gender"] = gender
    }
    if(city) {
        // console.log(city)
        filter["city"] = city
    } else if (state) {
        // console.log(state)
        filter["state"] = state
    } else if (country) {
        // console.log(country)
        filter["country"] = country
    }
    let users = []
    let userFound = false
    User.find(filter, '_id username picture birthDate').sort({'numberOfVotes': -1})
        .then(rankedUsers => {
            // console.log(rankedUsers)
            if (!rankedUsers) {
                console.log("users not found")
                return res.send(users)
            }
            let i = 1;
            //filter age
            if (age && typeof age !== undefined) {
                rankedUsers = rankedUsers.filter(u => getAge(u.birthDate) == age)
            }
            for (let u of rankedUsers){
                if(i <= numberOfPeopleToRank){
                    if (u.username === user.username) {
                        userFound = true
                    }
                    users.push(createUser(u._id, i, u.username, u.picture))
                } else if (!userFound) {
                    if (u.username === user.username) {
                        userFound = true
                        users.push(createUser(u._id, i, u.username, u.picture))
                        break;
                    }
                }
                i++
            }
            return res.send({"array" : users})
        })
}

exports.gender = function (req, res) {
    const userVotes = req.user.votes
    getGenderAnalytics(userVotes)
        .then(genderAnalytics => res.send(genderAnalytics))
}

exports.ages = function (req, res){
    const userVotes = req.user.votes
    getAgesAnalytics(userVotes)
        .then(agesAnalytics => res.send(agesAnalytics))
}

exports.countVotes = function (req, res) {
    return res.send({numberOfVotes: req.user.numberOfVotes})
}

exports.analytics = function (req, res) {
    const userVotes = req.user.votes
    const numberOfVotes = req.user.numberOfVotes
    Promise.all([getGenderAnalytics(userVotes), getAgesAnalytics(userVotes), getRankPosition(req.user.username)])
        .then(result => {
            const genderAnalytics = result[0]
            const agesAnalytics = result[1]
            const rankPosition = result[2]
            res.send({
                "numberOfVotes": numberOfVotes,
                "genderAnalytics": genderAnalytics,
                "agesAnalytics": agesAnalytics,
                "rankPosition":rankPosition
            })
        })
}

exports.notifies = function (req,res) {
    const userNotifies = req.user.notifies;
    let votes = 0
    let appeared = 0
    let notifies = []

    for (let notify of userNotifies) {
        if (notify == 'appeared') appeared ++
        else if (notify == 'voted') votes++
        else notifies.push(notify)
    }

    if (votes > 0 ) notifies.push("you have been voted "+ votes +" times")
    if (appeared > 0 ) notifies.push("you have appeared in "+ appeared +" matches")
    User.findByIdAndUpdate(req.user._id, {"notifies" : []}, () => res.send(notifies))
}

function createUser(id, rankPosition, username, picture){
    return {
        _id: id,
        rankPosition: rankPosition,
        username: username,
        picture: picture
    }
}

function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function calculatePercentage(x, y){
    const sum = x+y
    return {first:x/sum*100, second: y/sum*100 }
}

function getUsersFromVotes( votes){
    return Vote.aggregate([
        {
            $match : { _id : { $in: votes }}
        },{
            $project: {_id: 0, user:1}
        },{
            $lookup : {
                from:'users',
                localField: 'user',
                foreignField: '_id',
                as: 'completeUser'
            }
        },{
            $project: { completeUser: 1}
        }
    ])
}

function groupAges(agesArray){
    let ages = {}
    for(let age of agesArray){
        if(ages[age.toString()]){
            ages[age.toString()]++
        } else {
            ages[age.toString()] = 1
        }
    }
    return ages
}

function getGenderAnalytics(votesArray){
    return getUsersFromVotes(votesArray)
        .then(votesProjections=>{
            let maleVotes = 0
            let femaleVotes = 0
            let others = 0
            for( let user of votesProjections){
                if (user.completeUser.length===1){
                    const completeUser = user.completeUser[0]
                    if (completeUser.gender === "female" ){
                        femaleVotes++
                    } else if( completeUser.gender === "male"){
                        maleVotes++
                    } else {
                        others++
                    }
                }
            }
            return {males: maleVotes, females: femaleVotes, others: others}
        })
}

function getAgesAnalytics(votesArray){
    return getUsersFromVotes(votesArray)
        .then(users=>{
            let ages = []
            for( let rawUser of users){
                if (rawUser.completeUser.length===1){
                    const user = rawUser.completeUser[0]
                    const age = getAge(user.birthDate)
                    ages.push(age)
                }
            }
            return groupAges(ages)
        })
}

function getRankPosition(username){
    return User.find().sort({'numberOfVotes': -1})
        .then(rankedUsers => {
            // if (!rankedUsers) users not found
            let i = 1;
            for (let u of rankedUsers){
                //if I use _id it doesn't work
                //console.log(JSON.stringify(u._id) === JSON.stringify(user._id))
                if (u.username === username) {
                    return i
                }
                i++
            }
            // return res.sendStatus(404) user not found
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