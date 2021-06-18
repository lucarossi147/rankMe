User = require("../models/user");
const mailer = require('../controllers/mailUtility')
exports.show_signup_page = function (req, res) {
    //TODO res.sendFile(appRoot  + '/www/signup.html');
}

exports.signup = function(req, res) {
    //console.log(req.body);
    User.findOne({
        $or:[{
            username: req.body.username
        },{
            email:req.body.email
        }]
    }).then(tmpUser => {
        if (tmpUser)  {
            res.status(409).send({"description": "email or username already in use"})
        } else {
            let newUser = new User(req.body);
            newUser.save(function(err, user) {
                if (err){
                    res.send(err);
                }
                mailer.sendMail(req.body.email,"Welcome to RankMe!!","You completed your registration successfully")
                res.status(201).json(user);
            });
        }
    })
};
