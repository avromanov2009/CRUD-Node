const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    fullName: String,
    address: String,
    phoneNumber: String,
    jwt:String
});

module.exports = mongoose.model('User', UserSchema);
