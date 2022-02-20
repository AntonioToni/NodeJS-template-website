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
  const { name, lastName, email, password, dateOfBirth, gender} = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Molimo ispunite sva polja!' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Lozinka mora biti duža od 6 karaktera!' });
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
        errors.push({ msg: 'Email već postoji!' });
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
          dateOfBirth,
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
                  'Registrirani ste i sada se možete prijaviti.'
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
  req.flash('success_msg', 'Odjavljeni ste');
  res.redirect('/login');
});

module.exports = router;
