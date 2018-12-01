const router = require('express').Router();
const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = require('../db.js');

router.get('/item-boost-map-cards', function (req, res) { 
	sequelize.models.userBoostMapCards.findAll({where:{userId:req.userId, marketStatus:0},
		include:[
			{ model:sequelize.models.boostMapCards, as:"boostMapCardData", 
				include:[
					{ model:sequelize.models.rarityLevels, as: "rarityLevelsData" },
					{ model:sequelize.models.cardTypes, as: "cardTypesData" }
				]
			},
			{ model:sequelize.models.packs, as:"packData", include:[
				{ model:sequelize.models.masterPacks, as:"masterPackData" }
			]}
		]
	}).then(cards => {
		res.send({status:true, data:cards, message:""});
    });
});

module.exports = router; 