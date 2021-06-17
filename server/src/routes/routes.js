module.exports = function(app) {
    const loginController = require('../controllers/loginController');
    const signupController = require('../controllers/signupController');
    const utilityController = require('../controllers/utilityController')
    const matchController = require('../controllers/matchController')

    const multer = require('multer');

    //forse bisogna aggiungere una cartella static public
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, appRoot+'/images');
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

    app.route('/addSocial')
        .post(loginController.authenticate, utilityController.setSocialMediaLink)

    app.route('/profile/:userId')
        .get(loginController.authenticate, utilityController.getProfile)


    //AUTHENTICATE,
    app.route('/findMatch')
        .get(loginController.authenticate, matchController.getMatch)

    app.route('/winner')
        .post(loginController.authenticate, matchController.winner)
};
