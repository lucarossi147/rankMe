User = require("../models/user");

exports.show_signup_page = function (req, res) {
    //TODO res.sendFile(appRoot  + '/www/signup.html');
}

exports.signup = function(req, res) {
    //console.log(req.body);
    let newUser = new User(req.body);
    newUser.save(function(err, user) {
        if (err){
            res.send(err);
        }
        res.status(201).json(user);
    });
};
