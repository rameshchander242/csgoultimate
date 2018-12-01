const router = require('express').Router();

const Sequelize = require('sequelize');
var config = require('../config.js');

var sequelize = require('../db.js');

router.get('/master-packs-types', function (req, res) { 

    sequelize.models.masterPackTypes.findAll().then(packs => {
	    if(packs.length > 0){
	      res.send({status:true, data:packs});  
	    } else {
	      res.send({status:false, message:"No master pack types found !!"});
	    }
    });
});

module.exports = router;