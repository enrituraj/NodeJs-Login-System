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
  username:{
    type: String,
    required: false
  },
  phone: {
    type: Number,
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
  verify_email: {
    type: Boolean,
    default: false
  },
  dob:{
    type: Date,
    required: false
  },
  address:{
    type: String,
    required: false
  },
  pincode:{
    type: Number,
    required: false
  },
  country:{
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Defining Database collection name
const User = mongoose.model('User', UserSchema);

module.exports = User;