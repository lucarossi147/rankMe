User = require("../models/user");

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
