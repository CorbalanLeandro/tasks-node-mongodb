const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user: String,
    firtsName: String,
    lastName: String,
    email: String,
    password: String,
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('users', UserSchema);