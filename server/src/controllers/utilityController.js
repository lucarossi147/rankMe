User = require("../models/user");
const fs = require('fs')
const sharp = require('sharp');

exports.setSocialMediaLink = function (req, res){
    const facebook = req.body.facebook;
    const instagram = req.body.instagram;
    const user = req.user;

    const filter = { "_id": user._id};
    let update = { }
    if (facebook) {
        update.facebook = facebook
    }
    if (instagram) {
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

exports.getProfile = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err) return res.sendStatus(500)
        User.find().sort({'numberOfVotes': -1})
            .then(rankedUsers => {
                if (!rankedUsers) return res.sendStatus(404)
                let i = 1;
                for (let u of rankedUsers){
                    //if I use _id it doesn't work
                    if (u.username === user.username) {
                        const userToReturn = {
                            _id : user._id,
                            name : user.name,
                            surname : user.surname,
                            username : user.username,
                            rankPosition: i,
                            admin : user.admin,
                            instagram : user.instagram,
                            facebook : user.facebook,
                            birthDate: user.birthDate,
                            bio: user.bio,
                            picture: user.picture,
                            city: user.city,
                            state: user.state,
                            country: user.country
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
    //console.log('uploadPhoto')
    try {
        const fileName = req.file.filename;
        const filePath = appRoot+'/images/'
        const outputFile = Date.now().toString()+'.jpg'
        sharp(filePath+fileName)
            .resize( 1024,768 , { //if we wanted classical full hd 16/9, 1920x1080
                fit:'contain'
            })
            .toFile(filePath+outputFile)
            .then(data => {
                fs.unlink(filePath+fileName, err => {
                    if (err) return res.send(err)
                })
            })
            .catch(err => {
                return res.send(err)
            });
        const filter = { "_id": req.user._id};
        const update = { "picture": outputFile };
        User.findOneAndUpdate(filter, update,{
            new: true
        }).then(doc => {
            if (!doc) { res.status(500).json({"description": "an error occurred"}) }
            res.sendStatus(200)
        })
    }catch(err) {
        console.log(err);
        res.send(400);
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
    const myId = req.user._id
    const city = req.query.city
    const state = req.query.state
    const country = req.query.country
    const age = req.query.age
    let numberOfPeopleToRank
    if(req.query.n){
        numberOfPeopleToRank = req.query.n
    } else {
        numberOfPeopleToRank = 10
    }

    let filter = {}
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
    User.findById(myId, function (err, user) {
        if (err) return err
        let users = []
        let userFound = false
        User.find(filter).sort({'numberOfVotes': -1})
            .then(rankedUsers => {
                // console.log(rankedUsers)
                if (!rankedUsers) {
                    console.log("utenti non trovati")
                    return res.send(users)
                }
                let i = 1;
                //filter age
                if (age && typeof age !== undefined) {
                    //does not work with ===
                    rankedUsers = rankedUsers.filter(user => getAge(user.birthDate) == age)
                }
                for (let u of rankedUsers){
                    if(i <= numberOfPeopleToRank  || !userFound){
                        //if I use _id it doesn't work
                        // console.log(u.username)
                        if (u.username === user.username) {
                            userFound = true
                        }
                        users.push(createUser(u._id, i, u.username, u.picture))
                    } else if (!userFound) {
                        console.log("else if")
                        if (u.username === user.username) {
                            userFound = true
                            return res.send(users)
                        }
                        users.push(createUser(u._id, i, u.username, u.picture))
                    }
                    i++
                }
                return res.send(users)
            })
    })
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
