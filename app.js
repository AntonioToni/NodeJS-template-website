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

app.get('/profile', function (req, res) {
    res.render('pages/profile', {page_name: "_profile"});
});


app.get("*",(req,res) => {
    res.sendFile(__dirname + "/404.html")
})

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-mongodb', {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;