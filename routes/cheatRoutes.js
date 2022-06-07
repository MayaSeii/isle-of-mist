var express = require('express');
var router = express.Router();
var cModel = require("../models/cheatsModel");
            
router.post('/1', async function(req, res, next) {

    let id1 = req.body.id1;
    let id2 = req.body.id2;
    let id3 = req.body.id3;
    let id4 = req.body.id4;
    let id5 = req.body.id5;
    let id6 = req.body.id6;
    let idg = req.body.idg;

    let result = await cModel.state1(id1, id2, id3, id4, id5, id6, idg);
    res.status(result.status).send(result.result);
    
});

router.post('/2', async function(req, res, next) {

    let id1 = req.body.id1;
    let id2 = req.body.id2;
    let id3 = req.body.id3;
    let id4 = req.body.id4;
    let id5 = req.body.id5;
    let id6 = req.body.id6;
    let idg = req.body.idg;

    let result = await cModel.state2(id1, id2, id3, id4, id5, id6, idg);
    res.status(result.status).send(result.result);
    
});

router.post('/3', async function(req, res, next) {

    let id1 = req.body.id1;
    let id2 = req.body.id2;
    let id3 = req.body.id3;
    let id4 = req.body.id4;
    let id5 = req.body.id5;
    let id6 = req.body.id6;
    let idg = req.body.idg;

    let result = await cModel.state3(id1, id2, id3, id4, id5, id6, idg);
    res.status(result.status).send(result.result);
    
});
            
module.exports = router;