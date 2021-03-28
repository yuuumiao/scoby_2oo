const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    phoneNumber: String,
    contactWay: String
});


const Contact = mongoose.model("User", ContactSchema);
module.exports = Contact;