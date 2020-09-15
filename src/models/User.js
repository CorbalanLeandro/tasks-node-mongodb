const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,    
}, {
    timestamps: true
});

module.exports = mongoose.model('users', UserSchema);