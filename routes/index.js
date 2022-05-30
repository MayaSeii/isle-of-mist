var express = require('express');
var router = express.Router();
const path = require('path');   

// Login page.
router.get('/', function(req, res, next) {

    if (!req.signedCookies.playerID) res.render('index', { title: 'Express' });
    else res.redirect('/dashboard');
  
});

// Dashboard page.
router.get('/dashboard', (req, res) => {

    if (!req.signedCookies.playerID) res.redirect('/');
    else res.sendFile(path.resolve('public/dashboard.html'));

});

// Match page.
router.get('/match', (req, res) => {

    if (!req.signedCookies.playerID) res.redirect('/');
    else res.sendFile(path.resolve('public/match.html'));

});

module.exports = router;
