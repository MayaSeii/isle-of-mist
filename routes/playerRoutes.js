var express = require('express');
var router = express.Router();
var pModel = require("../models/playersModel");
            
router.get('/', async function(req, res, next) {

    let result = await pModel.getAllPlayers();
    res.status(result.status).send(result.result);
    
});

router.get('/:id', async function(req, res, next) {

    let id = req.params.id;
    let result = await pModel.getPlayerById(id);
    res.status(result.status).send(result.result);
    
});

router.get('/name/:username', async function(req, res) {

    let name = req.params.username;
    let result = await pModel.getPlayerByName(name);
    res.status(result.status).send(result.result);

});

router.get('/:id/characters', async function(req, res, next) {

    let id = req.params.id;
    let result = await pModel.getPlayerCharacters(id);
    res.status(result.status).send(result.result);
    
});
            
module.exports = router;