module.exports = function(app) {
    const loginController = require('../controllers/loginController');
    const signupController = require('../controllers/signupController');


    const multer = require('multer');

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/home/luca/rankMe/server/src/images');
        },
        filename: function (req, file, cb) {
            const date = Date.now().toString()
            cb(null, date+file.originalname);
        }
    })
    const upload = multer({storage: storage});

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

    //add check for authenticated
    app.route('/uploadPhoto')
        .post(loginController.authenticate, upload.single('profile'), loginController.uploadPhoto)

    app.route('/userImage')
        .get(loginController.authenticate, loginController.userImage)

    app.route('/non')
        .get(loginController.stampa)


    app.route('/prova')
        .get(loginController.authenticate, loginController.prova)
};
