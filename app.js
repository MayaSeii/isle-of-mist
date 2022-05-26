require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var charactersRouter = require('./routes/characterRoutes');
var matchCharactersRouter = require('./routes/matchCharacterRoutes');
var matchesRouter = require('./routes/matchRoutes');
var playersRouter = require('./routes/playerRoutes');
var skillsRouter = require('./routes/skillRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/matchcharacters', matchCharactersRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/players', playersRouter);
app.use('/api/skills', skillsRouter);

module.exports = app;
