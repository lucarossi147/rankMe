User = require("../models/user");

exports.show_signup_page = function (req, res) {
    //TODO res.sendFile(appRoot  + '/www/signup.html');
}

exports.signup = function(req, res) {
    const fs = require('fs');
    console.log(req.body);
    let newUser = new User(req.body);
    //could have done User.count but there is a deprecationWarning
    User.collection.countDocuments({}, function( err, count){
        newUser.rankPosition = count + 1
    })

    newUser.save(function(err, user) {
        if (err){
            res.send(err);
        }
        res.status(201).json(user);
    });
};
