var express = require('express');
var router = express.Router();
var pModel = require("../models/playersModel");
const bcrypt = require('bcrypt');
            
router.get('/', async function(req, res, next) {

    let result = await pModel.getAllPlayers();
    res.status(result.status).send(result.result);
    
});

router.get('/name/:username', async function(req, res) {

    let name = req.params.username;
    let result = await pModel.getPlayerByName(name);
    res.status(result.status).send(result.result);

});

router.post('/login', async function(req, res, next) {

    let username = req.body.username;
    let password = req.body.password;

    let result = await pModel.login(username);
    let hash = result.result.ply_password;

    if (hash) {

        // Checks if the password is correct.
        bcrypt.compare(password, hash, (err, valid) => {

            if (valid) {

                res.cookie('playerID', result.result.ply_id, { maxAge: 120*60*1000, httpOnly: true, signed: true });
                console.log(req.signedCookies);
                res.status(result.status).send(result.result);

            } else res.status(401).send({ msg: 'Invalid username or password! Please try again.' });

        });

    } else res.status(result.status).send(result.result);
    
});

router.post('/logout', async function(req, res, next) {

    // Checks if the user is logged in.
    if (!req.signedCookies.playerID) {

        res.status(401).send({ msg: 'You are not logged in.' });

    } else {

        res.clearCookie('playerID', { httpOnly: true, signed: true });
        res.status(200).send({ msg: 'Logged out!' });

    }

})

router.post('/register', async function(req, res, next) {

    let username = req.body.username;
    let password = req.body.password;

    // Encrypts the password.
    bcrypt.hash(password, 10, async (err, encrypted) => {

        let result = await pModel.register(username, encrypted);
        res.status(result.status).send(result.result);

    });
    
});

router.get('/current', async function(req, res) {

    // Checks if the user is logged in.
    if (!req.signedCookies.playerID) res.status(401).send({ msg: 'You are not logged in.' });
    else res.status(200).send(req.signedCookies.playerID);

});

router.get('/:id', async function(req, res, next) {

    let id = req.params.id;
    let result = await pModel.getPlayerById(id);
    res.status(result.status).send(result.result);
    
});

router.get('/:id/name', async function(req, res, next) {

    let id = req.params.id == '-1' ? req.signedCookies.playerID : req.params.id;

    let result = await pModel.getPlayerName(id);
    res.status(result.status).send(result.result);
    
});

router.get('/:id/characters', async function(req, res, next) {

    let id = req.params.id;

    let result = await pModel.getPlayerCharacters(id);
    res.status(result.status).send(result.result);
    
});

router.get('/:id/match', async function(req, res, next) {

    let id = req.params.id == '-1' ? req.signedCookies.playerID : req.params.id;

    let result = await pModel.getPlayerMatch(id);
    res.status(result.status).send(result.result);
    
});
            
module.exports = router;