var express = require('express');
var router = express.Router();
var cModel = require("../models/charactersModel");
            
router.get('/', async function(req, res, next) {

    let result = await cModel.getAllCharacters();
    res.status(result.status).send(result.result);
    
});

router.get('/:id', async function(req, res, next) {

    let id = req.params.id;
    let result = await cModel.getCharacterById(id);
    res.status(result.status).send(result.result);
    
});

router.get('/:id/skills', async function(req, res, next) {

    let id = req.params.id;
    let result = await cModel.getCharacterSkills(id);
    res.status(result.status).send(result.result);
    
});
            
module.exports = router;