const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
1. create a schema for the documents in this collection
this will say what properties the document will have
*/
const memberSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
    },
});

// 2. The model is what we use anytime we interact with this collection

const MemberModel = mongoose.model("Member", memberSchema);
module.exports = MemberModel;