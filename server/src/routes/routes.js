const passport = require("passport");
module.exports = function(app) {
    const loginController = require('../controllers/loginController');
    const signupController = require('../controllers/signupController');

    app.route('/login')
        .get(loginController.show_login_page)
        .post(loginController.login);


    app.route('/signup')
        .get(signupController.show_signup_page)
        .post(signupController.signup);

};
