const router = require('express').Router();
const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = require('../db.js');

router.get('/item-players', function (req, res) { 
	sequelize.models.userPlayerCards.findAll({where:{userId:req.userId, marketStatus:0},
		include:[
			{ model:sequelize.models.playerCards, as:"playerCardData", 
				include:[
					{ model:sequelize.models.players, as:"playersData", include:[
						{ model: sequelize.models.teams, as:"teamData" },
						{ model: sequelize.models.country, as:"countryData" }
					]},
					{ model:sequelize.models.roles, as:"rolesData" },
					{ model:sequelize.models.cardTypes, as:"cardTypesData" },
					{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" }
				]
			},
			{ model:sequelize.models.packs, as:"packData", include:[
				{ model:sequelize.models.masterPacks, as:"masterPackData"}
			]},
			{ model:sequelize.models.steamUsers, as:"userData"},
			{ model:sequelize.models.maps, as:"mapData"},
		]
	}).then(userPlayerCards => {
		res.send({status:true, data:userPlayerCards, message:""});
    })
})

router.get('/item-players/:id', function (req, res) { 
	sequelize.models.userPlayerCards.find({where:{id:req.params.id},
		include:[
			{ model:sequelize.models.playerCards, as:"playerCardData", 
				include:[
					{ model:sequelize.models.players, as:"playersData", include:[
						{ model: sequelize.models.teams, as:"teamData" },
						{ model: sequelize.models.country, as:"countryData" }
					]},
					{ model:sequelize.models.roles, as:"rolesData" },
					{ model:sequelize.models.cardTypes, as:"cardTypesData" },
					{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" }
				]
			},
			{ model:sequelize.models.packs, as:"packData", include:[
				{ model:sequelize.models.masterPacks, as:"masterPackData"}
			]},
			{ model:sequelize.models.steamUsers, as:"userData"},
			{ model:sequelize.models.maps, as:"mapData"},
		]
	}).then(userPlayerCards => {
		res.send({status:true, data:userPlayerCards, message:""});
    })
})

router.post('/item-player-sell', function (req, res) { 
	sequelize.models.userPlayerCards.find({where:{id:req.body.id}, include:[
		{ model:sequelize.models.playerCards, as:"playerCardData", include:[
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" }
		]}
	]}).then(userPlayerCard => {
		sequelize.models.steamUsers.find({where:{id:req.userId}}).then(user=>{
			sequelize.models.steamUsers.update({coinsBalance:user.coinsBalance+userPlayerCard.playerCardData.rarityLevelsData.quickSellValue},{where:{id:req.userId}}).then(updatedUser=>{
				sequelize.models.userPlayerCards.destroy({where :{id:req.body.id}}).then(deletedCard=>{
					sequelize.models.steamUsers.find({where:{id:req.userId}}).then(updatedUser=>{
						res.send({status:true, data:updatedUser, message:"Success. You sold an item for "+userPlayerCard.playerCardData.rarityLevelsData.quickSellValue+" coins"});
					})
				})
			})
		})
    })
})

module.exports = router; 