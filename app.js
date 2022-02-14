// Load Node modules
var express = require('express');
const ejs = require('ejs');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Port website will run on
app.listen(3000);

// *** GET Routes - display pages ***
// Root Route
app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/news', function (req, res) {
    res.render('pages/news');
});

app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.get('/login', function (req, res) {
    res.render('pages/login');
});

app.get('/news-template', function (req, res) {
    res.render('pages/news-template');
});