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

router.post('/characters/:id', async function(req, res, next) {

    let id = req.params.id;
    let character = req.body.character;
    let result = await mModel.updateMatchCharacter(id, character);
    res.status(result.status).send(result.result);

});
            
module.exports = router;