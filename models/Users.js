const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    },
    refreshToken: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('User', UserSchema);
