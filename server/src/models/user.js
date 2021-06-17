const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 10;
const LOCK_TIME = 2 * 60 * 60 * 1000;

let UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique:true
    },
    password: {
        type: String,
        require: true
    },
    picture:{
        type: String,
        default: appRoot+'/images/default-user-image.jpg'
    },
    address:{
        type: String
    },
    birthDate: {
        type: Date,
        require: true
    },
    votes: [{
        type: Schema.Types.ObjectId,
        ref:"Vote"
    }],
    admin: {
        type: Boolean,
        default: false
    },
    loginAttempts: {
        type: Number,
        required: true,
        default: 0
    },
    lockUntil: {
        type: Number
    },
    token:{
        type:String,
    },
    rankPosition:{      //calculate position at signup and update it when needed
        type: Number,
        default: null
    },
    facebook:{
        type: String,
        default: null
    },
    instagram:{
        type: String,
        default: null
    },
    bio:{
        type: String
    },
    numberOfVotes:{
        type:Number,
        default:0
    }
});

UserSchema.pre("save", function(next) {
    let user = this;

// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

// generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.virtual('isLocked').get(function() {
// check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

UserSchema.methods.incLoginAttempts = function(cb) { // if we have a previous lock that has expired, restart at 1
if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update({ $set: { loginAttempts: 1 }, $unset: { lockUntil: 1 } }, cb);
} // otherwise we're incrementing
var updates = { $inc: { loginAttempts: 1 } };
// lock the account if we've reached max attempts and it's not locked already
if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME };
}
return this.update(updates, cb);
};

// expose enum on the model, and provide an internal convenience reference
var reasons = UserSchema.statics.failedLogin = { NOT_FOUND: 0, PASSWORD_INCORRECT: 1, MAX_ATTEMPTS: 2 };

UserSchema.statics.getAuthenticated = function(usernameOrEmail, password, cb) {
    this.findOne({
        $or: [
            { username : usernameOrEmail },
            { email: usernameOrEmail }
        ]
    }, function(err, user) {
        if (err){
            return cb(err);
        }
        // make sure the user exists
        if (!user) {
            return cb(null, null, reasons.NOT_FOUND);
        }

        // check if the account is currently locked
        if (user.isLocked) {
            // just increment login attempts if account is already locked
            return user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.MAX_ATTEMPTS);
            });
        }

        // test for a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return cb(err);
            }

            // check if the password was a match
            if (isMatch) {
                // if there's no lock or failed attempts, just return the user
                if (!user.loginAttempts && !user.lockUntil) {
                    return cb(null, user);
                }
                // reset attempts and lock info
                let updates = {
                    $set: { loginAttempts: 0 },
                    $unset: { lockUntil: 1 }
                };
                return user.update(updates, function(err) {
                    if (err) {
                        return cb(err);
                    }
                    return cb(null, user);
                });
            }

            // password is incorrect, so increment login attempts before responding
            user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.PASSWORD_INCORRECT);
            });
        });
    });
}

module.exports = mongoose.model("User", UserSchema);
