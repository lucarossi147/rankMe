User = require("../models/user");
require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.show_login_page = function (req, res) {
    res.sendFile(appRoot  + '/www/login.html');
}

exports.login = function(req, res) {
    User.getAuthenticated(req.body.username,  req.body.password, function(err, user, reason) {
        if (err) { throw err; }

        // login was successful if we have a user
        if (user) {
            // handle login success
            const accessToken = generateAccessToken(user._id)
            const refreshToken = jwt.sign(JSON.stringify(user._id), process.env.REFRESH_TOKEN_SECRET)

            const filter = { "_id": user._id };
            const update = { "token": refreshToken };
            User.findOneAndUpdate(filter, update,{
                new: true
            }).then(doc =>{
                //console.log(doc.token)
                if (!doc) res.status(500).json({"accessToken" :accessToken, "refreshToken": refreshToken});
                res.status(200).json({"accessToken" :accessToken, "refreshToken": refreshToken, "user": user});
            })
        }

        // otherwise we can determine why we failed
        let reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
                res.status(401).json({"description": "incorrect username or password"});
                break;
            case reasons.PASSWORD_INCORRECT:
                // note: these cases are usually treated the same - don't tell
                // the user *why* the login failed, only that it did
                res.status(401).json({"description": "incorrect username or password"});
                break;
            case reasons.MAX_ATTEMPTS:
                // send email or otherwise notify user that account is
                // temporarily locked
                res.status(401).json({"description": "you have been locked"});
                break;
        }
    });
};


function generateAccessToken(userId){
    return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '365d' // expires in 15 minutes
    })
}

exports.authenticate = function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //takes the token if exists
    if (token == null|| typeof token === undefined) {return res.status(401)}

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403) // token expired
        //console.log(user)

        //qui cerco l'utente e lo deserializzo poi lo passo sulla req
        User.findById(user.userId, function (err, user){
            if (err) return res.sendStatus(500)
            //console.log(user)
            req.user = user
            next()
        })
    })
}

exports.token = function (req, res){
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    User.findOne({ "token": refreshToken}, function (err, doc) {
        if (err) { return res.sendStatus(500) }
        if (doc == null) { return res.sendStatus(403) }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
            if (err) return res.status(403)
            const accessToken = generateAccessToken({"name": user.name})
            return res.json({"accessToken": accessToken});
        })
    });
}

exports.logout = function(req,res){
    const filter = { "token": req.user.token };
    const update = { "token": "" };
    User.findOneAndUpdate(filter, update,{
        new: true
    }).then(doc => {
     if (!doc) {return  res.sendStatus(500).json({"description": "no token found"}) }
     return res.sendStatus(204)
    })
}
