const mongoose = require('mongoose');
// Create a schema for login and register or Find Data from database

const VerifySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Defining Database collection name
const Verify = mongoose.model('Verify', VerifySchema);

module.exports = Verify;