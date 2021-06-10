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

    app.route('/token')
        .post(loginController.token)

    app.route('/logout')
        .delete(loginController.logout)

    app.route('/non')
        .get(loginController.stampa)

    app.route('/prova')
        .get(loginController.authenticate, loginController.prova)
};
