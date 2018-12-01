const router = require('express').Router();

const Sequelize = require('sequelize');
var config = require('../config.js');

var sequelize = require('../db.js');

router.get('/pack-tabs', function (req, res) { 
    sequelize.models.packTabs.findAll({}).then(tabs => {
	    if(tabs.length > 0){
	      res.send({status:true, data:tabs});  
	    } else {
	      res.send({status:false, message:"No tabs found !!"});
	    }
    });
});

module.exports = router;
