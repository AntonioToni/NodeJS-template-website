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

var page_name;

// *** GET Routes - display pages ***
// Root Route
app.get('/', function (req, res) {
    res.render('pages/index', {page_name: "index"});
});

app.get('/news', function (req, res) {
    res.render('pages/news', {page_name: "news"});
});

app.get('/about', function (req, res) {
    res.render('pages/about', {page_name: "about"});
});

app.get('/login', function (req, res) {
    res.render('pages/login', {page_name: "login"});
});

app.get('/news-template', function (req, res) {
    res.render('pages/news-template', {page_name: "_news"});
});

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3000,
    user: 'Admin',
    password: 'password',
    database: 'database name'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});
