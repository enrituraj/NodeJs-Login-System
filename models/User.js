const mongoose = require('mongoose');

// Create a schema for login and register or Find Data from database

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Defining Database collection name
const User = mongoose.model('User', UserSchema);

module.exports = User;