const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('./auth');
const User = require('./../models/User')

router.use('/',require('./users'));
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) =>{ 
  res.render('welcome')
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// Edit Profile
router.get('/edit-profile', ensureAuthenticated, (req, res) =>
  res.render('edit_profile', {
    user: req.user
  })
);

router.put('/edit_profile', ensureAuthenticated , (req,res) =>{
  const { name, email,phone, password } = req.body;
  User.updateOne()
})

module.exports = router;
