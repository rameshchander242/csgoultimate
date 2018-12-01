const router = require('express').Router();
const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = require('../db.js');
var count = 0;
var data = {};
router.get('/item-boost-team-cards', function (req, res) { 
	data = {};
	count = 0;
	sequelize.models.userBoostTeamCards.findAll({where:{userId:req.userId, marketStatus:0},
		include:[
			{ model:sequelize.models.boostTeamCards, as:"boostTeamCardData", 
				include:[
					{ model:sequelize.models.rarityLevels, as: "rarityLevelsData" },
					{ model:sequelize.models.cardTypes, as: "cardTypesData" },
					{ model:sequelize.models.teams, as:"teamData" }
				]
			},
			{ model:sequelize.models.packs, as:"packData", include:[
				{ model:sequelize.models.masterPacks, as:"masterPackData" }
			]}
		]
	}).then(cards => {
		count = 1;
		getBoostType(cards, req, res);
    });
});

function getBoostType(cards, req, res){
	if(count == cards.length || cards.length==0){
		res.send({data:data, status:true, message:''});
	} else {
		data["boost_card_data_"+cards[count-1].id] = cards[count-1];
		if(cards[count-1].boostTeamCardData.boostTypeId1 == 1){
			getBoostTypeOf1(cards, req, res, cards[count-1].boostTeamCardData.boostTypeValue1, "maps");
		} else {
			getBoostTypeOf1(cards, req, res, cards[count-1].boostTeamCardData.boostTypeValue1, "roles");
		}
		
	}
}

function getBoostTypeOf1(cards, req, res, id, module){
	
	sequelize.models[module].find({where:{id:id}}).then(boost_type_1_data=>{
		data["boost_card_type_"+cards[count-1].id+"_1"] = boost_type_1_data;
		if(cards[count-1].boostTeamCardData.boostTypeId2 == 1){
			getBoostTypeOf2(cards, req, res, cards[count-1].boostTeamCardData.boostTypeValue2, "maps")
		} else {
			getBoostTypeOf2(cards, req, res, cards[count-1].boostTeamCardData.boostTypeValue2, "roles")
		}
	});
}

function getBoostTypeOf2(cards, req, res, id, module){
	
	sequelize.models[module].find({where:{id:id}}).then(boost_type_1_data=>{
		data["boost_card_type_"+cards[count-1].id+"_2"] = boost_type_1_data;
		if(cards[count-1].boostTeamCardData.boostTypeId3 == 1){
			getBoostTypeOf3(cards, req, res, cards[count-1].boostTeamCardData.boostTypeValue3, "maps")
		} else {
			getBoostTypeOf3(cards, req, res, cards[count-1].boostTeamCardData.boostTypeValue3, "roles")
		}
	});
}

function getBoostTypeOf3(cards, req, res, id, module){
	
	sequelize.models[module].find({where:{id:id}}).then(boost_type_1_data=>{
		data["boost_card_type_"+cards[count-1].id+"_3"] = boost_type_1_data;
		count = count+1;
		getBoostType(cards, req, res);
	});
}

module.exports = router; 