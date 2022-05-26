var express = require('express');
var router = express.Router();
var sModel = require("../models/skillsModel");
            
router.get('/', async function(req, res, next) {

    let result = await sModel.getAllSkills();
    res.status(result.status).send(result.result);
    
});

router.get('/:id', async function(req, res, next) {

    let id = req.params.id;
    let result = await sModel.getSkillById(id);
    res.status(result.status).send(result.result);
    
});

router.post('/match/:id/:charId', async function(req, res, next) {

    let id = req.params.id;
    let charId = req.params.charId;

    let result = await sModel.markSkillAsUsed(charId, id);
    res.status(result.status).send(result.result);

});

router.post('/match/unused/:id/:charId', async function(req, res, next) {

    let id = req.params.id;
    let charId = req.params.charId;

    let result = await sModel.markSkillAsUnused(charId, id);
    res.status(result.status).send(result.result);

});

module.exports = router;