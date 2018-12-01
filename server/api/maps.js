const router = require('express').Router();
const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = require('../db.js');

// Get All my maps
router.get('/maps', function (req, res) { 
	sequelize.models.maps.findAll().then(maps => {
		res.send({status:true, message:"", data:maps});
    });
}); 

module.exports = router;