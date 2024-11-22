
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var usersRouter = require('./routes/users');
var loginRouter = require('./routes/auth');

var app = express();

app.use(session({
    secret: '808670664a400230b22154a0cb043c9f7a1e412d6222fbc8af4e5b3a17c072bb',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization,X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/auth', loginRouter);

module.exports = app;
