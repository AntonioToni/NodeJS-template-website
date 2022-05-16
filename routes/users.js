const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  let { name, lastName, email, password, dateOfBirth, gender} = req.body;
  let errors = [];
  var DoB = Array.from(dateOfBirth.join('-'));
  DoB = DoB.toString();
  DoB = DoB.replaceAll(',', '');
  dateOfBirth = DoB;
  if (!name || !lastName || !email || !password || !dateOfBirth || !gender) {
    errors.push({ msg: 'Please enter all fields!' });
  }

  if (dateOfBirth.includes("day") || dateOfBirth.includes("month") || dateOfBirth.includes("year"))
  {
    errors.push({ msg: 'Please enter all fields!' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must have at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      lastName,
      email,
      password,
      dateOfBirth,
      gender
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists!' });
        res.render('register', {
          errors,
          name,
          lastName,
          email,
          password,
          dateOfBirth,
          gender
        });
      } else {
        const newUser = new User({
          name,
          lastName,
          email,
          password,
          DoB,
          gender
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
                  'You are now registered and can login.'
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
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Signed off');
  res.redirect('/login');
});

module.exports = router;
