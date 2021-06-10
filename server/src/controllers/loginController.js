User = require("../models/user");
require('dotenv').config()
const jwt = require('jsonwebtoken');

//TODO da togliere
let refreshTokens = [];

exports.show_login_page = function (req, res) {
    res.sendFile(appRoot  + '/www/login.html');
}

exports.login = function(req, res) {
    User.getAuthenticated(req.body.username,  req.body.password, function(err, user, reason) {
        if (err) throw err;

        // login was successful if we have a user
        if (user) {
            // handle login success
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(JSON.stringify(user), process.env.REFRESH_TOKEN_SECRET)

            const filter = { "_id": user._id };
            const update = { "token": refreshToken };
            User.findOneAndUpdate(filter, update,{
                new: true
            }).then(doc => console.log(doc.token))
            //TODO DA TOGLIERE/CAMBIARE
            refreshTokens.push(refreshToken)

            // res.status(200).json(user);
            res.status(200).json({"accessToken" :accessToken, "refreshToken": refreshToken});
        }

        // otherwise we can determine why we failed
        var reasons = User.failedLogin;
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


function generateAccessToken(user){
    return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '15m' // expires in 15 minutes
    })
}

exports.authenticate = function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //takes the token if exists
    if (token == null|| typeof token === undefined) {return res.status(401)}

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403) // token expired
        // console.log(user.user)
        req.user = user.user
        res.sendStatus(200)
        next()
    })
}

exports.token = function (req, res){
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    //TODO TOGLIERE QUESTO E IMPLEMENTARE SOTTO
    //if (!refreshToken.includes(refreshToken)) return res.sendStatus(403)
    User.findOne({ "token": refreshToken}, function (err, doc) {
        if (err) { return res.sendStatus(500) }
        if (doc == null) { return res.sendStatus(403) }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
            if (err) return res.status(403)
            const accessToken = generateAccessToken({"name": user.name})
            return res.json({"accessToken": accessToken});
        })
    });
    //aggiungere un token nel db, magari in una collection a parte
    //se il token non e'nella collection return res.sendStatus(403)
    //altrimenti
   /* jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if (err) return res.status(403)
        const accessToken = generateAccessToken({"name": user.name})
        return res.json({"accessToken": accessToken});
    })*/

}

exports.logout = function(req,res){
    const filter = { "token": req.body.token };
    const update = { "token": "" };
    User.findOneAndUpdate(filter, update,{
        new: true
    }).then(doc => {
     if (!doc) { res.status(200).json({"description": "no token found, already logged out or some error passing token occurred"}) }
     res.status(204)
    })
}

exports.prova = function proviaml(req,res){
    console.log("hello " + req.user.name)
    res.status(200);
}

exports.stampa = function fok(req,res){
    res.status(200).json({"description": "ok"});
}
