const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
1. create a schema for the documents in this collection
this will say what properties the document will have
*/
const loginSchema = new Schema({
    password: {
        type: String,
        required: true
    }, 
    designation: {
        type: String,
        required: true
    }
});

// 2. The model is what we use anytime we interact with this collection

const LoginModel = mongoose.model("Login", loginSchema);
module.exports = LoginModel;