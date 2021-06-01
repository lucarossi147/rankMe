const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AddressSchema = new Schema({
    address: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Address", AddressSchema, "addresses");