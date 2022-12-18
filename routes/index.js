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

router.put('/edit_profile', ensureAuthenticated ,async (req,res) =>{
    try {
    const {name,email,username,phone,dob,address,pincode,country} = req.body;
      const update = await User.updateOne({email},{
        $set : {
          name:name,
          username:username,
          phone:phone,
          dob:dob,
          address:address,
          pincode:pincode,
          country:country
        }
      })
      if(update.modifiedCount == 1){
        res.redirect('/dashboard')
      }
    } catch (error) {
      console.log(error);
    }


})










router.get('/admin', ensureAuthenticated, async (req, res) =>{
  const all_user = await User.find();
  res.render('admin', {all_user})
});


module.exports = router;
