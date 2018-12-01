const router = require('express').Router();
const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = require('../db.js');

router.get('/item-coaches', function (req, res) { 
	sequelize.models.userCoachCards.findAll({where:{userId:req.userId, marketStatus:0},
		include:[
			{ model:sequelize.models.coachCards, as:"coachCardData", 
				include:[
					{ model:sequelize.models.boostTypes, as: "boostTypeData"},
					{ model:sequelize.models.coaches, as:"coachData", include:[
						{ model: sequelize.models.teams, as:"teamData" },
						{ model: sequelize.models.country, as:"countryData" }
					]},
					{ model:sequelize.models.rarityLevels, as: "rarityLevelsData" },
					{ model:sequelize.models.cardTypes, as:"cardTypesData" },
					{ model:sequelize.models.boostRoleCards, as:"boostRoleCardsData", include:[
						{ model:sequelize.models.roles, as:"rolesData" }
					]},
					{ model:sequelize.models.boostMapCards, as:"boostMapCardsData", include:[
						{ model:sequelize.models.maps, as:"mapsData" }
					]},
				]
			},
			{ model:sequelize.models.packs, as:"packData", include:[
				{ model:sequelize.models.masterPacks, as:"masterPackData"}
			]}
		]
	}).then(userPlayerCards => {
		res.send({status:true, data:userPlayerCards, message:""});
    })
})

module.exports = router; 