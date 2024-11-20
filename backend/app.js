var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var recipesRouter = require('./routes/recipes');
var usersRouter = require('./routes/users');

var app = express();

app.use(session({
    secret: 'FdzvG2o9cXl42OYocqurNNonhObVfaIf',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rotas principais
app.use('/api/recipes', recipesRouter);
app.use('/api/users', usersRouter);

// Tratamento de erros
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
