var express = require('express');
var router = express.Router();
var mModel = require("../models/matchesModel");
            
router.get('/', async function(req, res, next) {

    let result = await mModel.getAllMatches();
    res.status(result.status).send(result.result);
    
});

router.post('/newMatch', async function(req, res, next) {

    if (!req.signedCookies.playerID) {

        res.status(401).send({ msg: 'You\'re not logged in!' });

    } else {

        let matchName = req.body.matchName;
        let matchPass = req.body.matchPass;
        let playerID = req.signedCookies.playerID;
    
        let result = await mModel.newMatch(matchName, matchPass, playerID);
        res.status(result.status).send(result.result);

    }

});

router.get('/isInMatch', async function(req, res, next) {

    if (!req.signedCookies.playerID) {

        res.status(401).send({ msg: 'You\'re not logged in!' });

    } else {

        let playerID = req.signedCookies.playerID;
    
        let result = await mModel.playerIsInMatch(playerID);
        res.status(result.status).send(result.result);

    }

});

router.post('/joinMatch', async function(req, res, next) {

    if (!req.signedCookies.playerID) {

        res.status(401).send({ msg: 'You\'re not logged in!' });

    } else {

        let matchName = req.body.matchName;
        let matchPass = req.body.matchPass;
        let playerID = req.signedCookies.playerID;
    
        let result = await mModel.joinMatch(matchName, matchPass, playerID);
        res.status(result.status).send(result.result);

    }

});

router.get('/count/:name', async function(req, res, next) {

    let name = req.params.name;
    let result = await mModel.matchCountByName(name);
    res.status(result.status).send(result.result.toString());
    
});

router.get('/:id', async function(req, res, next) {

    let id = req.params.id;
    let result = await mModel.getMatchById(id);
    res.status(result.status).send(result.result);
    
});

router.get('/:id/activeplayer', async function(req, res, next) {

    let id = req.params.id;
    let result = await mModel.getMatchActivePlayer(id);
    res.status(result.status).send(result.result);
    
});

router.get('/:id/arena', async function(req, res, next) {

    let id = req.params.id;
    let result = await mModel.getMatchArena(id);
    res.status(result.status).send(result.result);
    
});

router.get('/:id/guardian', async function(req, res, next) {

    let id = req.params.id;
    let result = await mModel.getMatchGuardian(id);
    res.status(result.status).send(result.result);
    
});

router.post('/:id/newTurn', async function(req, res, next) {

    if (!req.signedCookies.playerID) {

        res.status(401).send({ msg: 'You\'re not logged in!' });

    } else {

        let id = req.params.id;
        let result = await mModel.newTurn(id);
        res.status(result.status).send(result.result);

    }

});

router.post('/:id/winner', async function(req, res, next) {

    if (!req.signedCookies.playerID) {

        res.status(401).send({ msg: 'You\'re not logged in!' });

    } else {

        let id = req.params.id;
        let winnerId = req.body.winnerId;

        let result = await mModel.setWinner(id, winnerId);
        res.status(result.status).send(result.result);

    }

});

router.delete('/delete', async function(req, res, next) {

    if (!req.signedCookies.playerID) {

        res.status(401).send({ msg: 'You\'re not logged in!' });

    } else {

        let match = req.body.match;
        let result = await mModel.deleteMatch(match);
        res.status(result.status).send(result.result);

    }

})
            
module.exports = router;