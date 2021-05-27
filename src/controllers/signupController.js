User = require("../models/user");

exports.show_signup_page = function (req, res) {
    //TODO res.sendFile(appRoot  + '/www/signup.html');
}

exports.signup = function(req, res) {
    const fs = require('fs');
    console.log(req.body);
    let newUser = new User(req.body);
    console.log(newUser);

    decodeAndSaveImage(newUser.picture, createPath(newUser.username));

    newUser.save(function(err, user) {
        if (err){
            res.send(err);
        }
        res.status(201).json(user);
    });
};

exports.update_user = function(req, res) {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        else{
            if(user==null){
                res.status(404).send({
                    description: 'User not found'
                });
            }
            else{
                //update user
                res.json(user);
            }
        }
    });
};

exports.delete_user = function(req, res) {
    User.deleteOne({_id: req.params.id}, function(err, result) {
        if (err)
            res.send(err);
        else{
            if(result.deletedCount==0){
                res.status(404).send({
                    description: 'User not found'
                });
            }
            else{
                res.json({ message: 'User successfully deleted' });
            }
        }
    });
};

function encodeImage(imagePath){
    const fs = require('fs');

    let buff = fs.readFileSync(imagePath);
    let base64data = buff.toString('base64');
    console.log('Image converted to base 64 is:\n\n' + base64data);
    return base64data;
}

function decodeAndSaveImage(encodedImage, pathToSaveImage){
    const fs = require('fs');

    let buff = new Buffer(encodedImage, 'base64');
    fs.writeFileSync(pathToSaveImage, buff);
    console.log('Base64 image data converted to file: ' + pathToSaveImage);
}
//we could send in the request the file type and save it again in the same format
function createPath(username){
    return "../images/userImages/"+username+".jpg";
}
