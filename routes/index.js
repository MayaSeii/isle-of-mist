var express = require('express');
var router = express.Router();
const path = require('path');   

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/draft', (req, res) => {
  res.sendFile(path.resolve('public/draft.html'));
});

router.get('/dashboard', (req, res) => {
  res.sendFile(path.resolve('public/dashboard.html'));
});

router.get('/game', (req, res) => {
  res.sendFile(path.resolve('public/main.html'));
});

// TODO: test game, remove later.
router.get('/test', (req, res) => {
  res.sendFile(path.resolve('public/testgame.html'));
});

module.exports = router;
