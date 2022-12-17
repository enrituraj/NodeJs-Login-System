const express = require('express');
const router = express.Router();
const path = require('path')
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('./../models/User');
const { forwardAuthenticated } = require('./auth');

const staticpath = path.join(__dirname, "./../public");
router.use(express.static(staticpath));


// Login Page
router.get('/', forwardAuthenticated, (req, res) =>{ 
  res.render('index')
});

// Login Page
router.get('/login', forwardAuthenticated, (req, res) =>{ 
  res.render('login')
});

// Login Page
router.get('/forgot-password', forwardAuthenticated, (req, res) =>{ 
  res.render('forgot-password')
});

// Register Page
router.get('/register', forwardAuthenticated, (req, res) =>{
  res.render('register')
});

// Register
router.post('/register', (req, res) => {
  const { name, email,phone, password } = req.body;
  let errors = [];

  if (!name || !email || !phone || !password ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      phone,
      password
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,phone,
          password
        });
      } else {
        const newUser = new User({
          name,
          email,
          phone,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.delete('/logout', (req, res) => {
  req.logout(function(err){
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
});





module.exports = router;
