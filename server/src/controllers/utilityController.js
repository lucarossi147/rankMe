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
                            picture: user.picture
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
