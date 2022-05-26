var express = require('express');
var router = express.Router();
var cModel = require("../models/matchCharactersModel");
            
router.get('/', async function(req, res, next) {

    let result = await cModel.getAllMatchCharacters();
    res.status(result.status).send(result.result);
    
});

router.get('/:id', async function(req, res, next) {

    let id = req.params.id;
    let result = await cModel.getMatchCharacterById(id);
    res.status(result.status).send(result.result);
    
});

router.post('/:id/resetAP/:player', async function(req, res, next) {

    let id = req.params.id;
    let player = req.params.player;

    let result = await cModel.resetMatchCharacterAP(id, player);
    res.status(result.status).send(result.result);

});

router.post('/:id/hurt/:skill/:dmg', async function(req, res, next) {

    let id = req.params.id;
    let skill = req.params.skill;
    let dmg = req.params.dmg;

    let result = await cModel.hurtMatchCharacter(id, skill, dmg);
    res.status(result.status).send(result.result);

});

router.post('/:id/move', async function(req, res, next) {

    let id = req.params.id;
    let posX = req.body.posX;
    let posY = req.body.posY;

    let result = await cModel.moveMatchCharacter(id, posX, posY);
    res.status(result.status).send(result.result);

});

router.get('/:id/skills', async function(req, res, next) {

    let id = req.params.id;
    let result = await cModel.getMatchCharacterSkills(id);
    res.status(result.status).send(result.result);

});

router.get('/:id/guard', async function(req, res, next) {

    let id = req.params.id;
    let result = await cModel.guardMatchCharacter(id);
    res.status(result.status).send(result.result);

});
            
module.exports = router;