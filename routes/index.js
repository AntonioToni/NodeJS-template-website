const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
//router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard - Example that will only load if you're logged in (registration required)
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/', function(req, res, next) {
  res.render('index', {
    page_name: "index",
    title: 'index',
    user: req.user
  });
});

router.get('/login', function (req, res) {
  res.render('login', {
    page_name: "login"
  });
});
router.get('/register', function (req, res) {
  res.render('register', {
    page_name: "register"
  });
});

// Pages
router.get('/news', function (req, res) {
  res.render('news', {
    page_name: "news",
    user: req.user
  });
});

router.get('/about', function (req, res) {
  res.render('about', {
    page_name: "about",
    user: req.user
  });
});

router.get('/news-template', function (req, res) {
  res.render('news-template', {
    page_name: "_news",
    user: req.user
  });
});

router.get('/profile', function (req, res) {
  res.render('profile', {
    page_name: "_profile"
  });
});

router.get('/new-post', function (req, res) {
  res.render('newpost', {
    page_name: "newpost",
    user: req.user
  });
});

module.exports = router;
