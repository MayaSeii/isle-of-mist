var express = require('express');
var router = express.Router();
var mModel = require("../models/matchesModel");
            
router.get('/', async function(req, res, next) {

    let result = await mModel.getAllMatches();
    res.status(result.status).send(result.result);
    
});

router.get('/:id', async function(req, res, next) {

    let id = req.params.id;
    let result = await mModel.getMatchById(id);
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

router.get('/characters/:id', async function(req, res, next) {

    let id = req.params.id;
    let result = await mModel.getMatchCharacterById(id);
    res.status(result.status).send(result.result);

});

router.post('/characters/:id', async function(req, res, next) {

    let id = req.params.id;
    let character = req.body.character;
    let result = await mModel.updateMatchCharacter(id, character);
    res.status(result.status).send(result.result);

});

router.post('/characters/:id/resetAP/:player', async function(req, res, next) {

    let id = req.params.id;
    let player = req.params.player;

    let result = await mModel.resetMatchCharacterAP(id, player);
    res.status(result.status).send(result.result);

});

router.post('/characters/:id/move/', async function(req, res, next) {

    let id = req.params.id;
    let posX = req.body.posX;
    let posY = req.body.posY;

    let result = await mModel.moveMatchCharacter(id, posX, posY);
    res.status(result.status).send(result.result);

});

router.get('/characters/:id/skills', async function(req, res, next) {

    let id = req.params.id;
    let result = await mModel.getMatchCharacterSkillsById(id);
    res.status(result.status).send(result.result);

});

router.post('/:id/newTurn', async function(req, res, next) {

    let id = req.params.id;
    let result = await mModel.newTurn(id);
    res.status(result.status).send(result.result);

});
            
module.exports = router;