require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var charactersRouter = require('./routes/characterRoutes');
var matchCharactersRouter = require('./routes/matchCharacterRoutes');
var matchesRouter = require('./routes/matchRoutes');
var playersRouter = require('./routes/playerRoutes');
var skillsRouter = require('./routes/skillRoutes');
var guardiansRouter = require('./routes/guardianRoutes');
var cheatsRouter = require('./routes/cheatRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('ueetuyRpG2OtaSzdS5SK'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/matchcharacters', matchCharactersRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/players', playersRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/guardians', guardiansRouter);
app.use('/api/cheats', cheatsRouter);

module.exports = app;
