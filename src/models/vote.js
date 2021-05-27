const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let VoteSchema = new Schema({
    date: {
        type: Date,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User"
    }
});

module.exports = mongoose.model("Vote", VoteSchema, "votes");