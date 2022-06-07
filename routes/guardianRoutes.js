var express = require('express');
var router = express.Router();
var gModel = require("../models/guardiansModel");

router.post('/:id/move', async function(req, res, _next) {

    if (!req.signedCookies.playerID) {

        res.status(401).send({ msg: 'You\'re not logged in!' });

    } else {

        let id = req.params.id;
        let posX = req.body.posX;
        let posY = req.body.posY;

        let result = await gModel.moveGuardian(id, posX, posY);
        res.status(result.status).send(result.result);

    }

});

router.post('/:id/hurt', async function(req, res, _next) {

    if (!req.signedCookies.playerID) {

        res.status(401).send({ msg: 'You\'re not logged in!' });

    } else {

        let id = req.params.id;
        let skill = req.body.skill;
        let dmg = req.body.dmg;

        let result = await gModel.hurtGuardian(id, skill, dmg);
        res.status(result.status).send(result.result);

    }

});

router.post('/:id/egg', async function(req, res, _next) {

    if (!req.signedCookies.playerID) {

        res.status(401).send({ msg: 'You\'re not logged in!' });

    } else {

        let id = req.params.id;

        let result = await gModel.spawnEgg(id);
        res.status(result.status).send(result.result);

    }

});
            
module.exports = router;