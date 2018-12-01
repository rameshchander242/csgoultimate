const router = require('express').Router();
const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = require('../db.js');

// Get custom pages
router.get('/pages/:id', function (req, res) { 
	sequelize.models.pages.find({where:{id:req.params.id, status:1}}).then(pages => {
		res.send({status:true, message:"", data:pages, id :req.params.id});
  });
}); 

router.get('/coming-soon-pages', function (req, res) { 
	sequelize.models.pages.findAll({where:{comingSoon:true, status:1}}).then(pages => {
		res.send({status:true, data:pages, message:""});
    });
});


module.exports = router;