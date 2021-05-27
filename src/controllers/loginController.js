User = require("../models/user");

exports.show_login_page = function (req, res) {
    res.sendFile(appRoot  + '/www/login.html');
}

exports.login = function(req, res) {
    User.getAuthenticated(req.body.username,  req.body.password, function(err, user, reason) {
        if (err) throw err;

        // login was successful if we have a user
        if (user) {
            // handle login success
            res.status(200).json(user);
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
