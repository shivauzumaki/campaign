
var express  = require('express');
var app      = express();                               // set the port
var passport = require('passport');
var flash    = require('connect-flash');

var morgan = require('morgan');             // log requests to the console (express4)
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var session      = require('express-session');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.set('views',__dirname+'views');
// required for passport
app.use(session({
    secret: 'ideadeck',
    resave: true,
    saveUninitialized: true,
    cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes
require('./app/routes')(app,passport);
//Models
var models = require("./app/models");
//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

//require("./app/controllers/emailSchedule");

require('./config/passport.js')(passport, models.user);

module.exports = app;


