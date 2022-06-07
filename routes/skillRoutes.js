var express = require('express');
var router = express.Router();
var sModel = require("../models/skillsModel");
            
router.get('/', async function(_req, res, _next) {

    let result = await sModel.getAllSkills();
    res.status(result.status).send(result.result);
    
});

router.get('/:id', async function(req, res, _next) {

    let id = req.params.id;
    let result = await sModel.getSkillById(id);
    res.status(result.status).send(result.result);
    
});

router.post('/used', async function(req, res, _next) {

    let id = req.body.id;
    let charID = req.body.charID;

    let result = await sModel.markSkillAsUsed(charID, id);
    res.status(result.status).send(result.result);

});

router.post('/unused', async function(req, res, _next) {

    let id = req.body.id;
    let charID = req.body.charID;

    let result = await sModel.markSkillAsUnused(charID, id);
    res.status(result.status).send(result.result);

});

module.exports = router;