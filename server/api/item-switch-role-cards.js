const router = require('express').Router();
const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = require('../db.js');

router.get('/item-switch-role-cards', function (req, res) { 
	sequelize.models.userSwitchRoleCards.findAll({where:{userId:req.userId, marketStatus:0},
		include:[
			{ model:sequelize.models.switchRoleCards, as:"switchRoleCardData", 
				include:[
					{ model:sequelize.models.rarityLevels, as: "rarityLevelsData" },
					{ model:sequelize.models.cardTypes, as: "cardTypesData" }
				]
			},
			{ model:sequelize.models.packs, as:"packData", include:[
				{ model:sequelize.models.masterPacks, as:"masterPackData"}
			]}
		]
	}).then(cards => {
		res.send({status:true, data:cards, message:""});
    })
})

module.exports = router; 