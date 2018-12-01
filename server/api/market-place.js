const router = require('express').Router();
const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = require('../db.js');
var itemsDetails = require('../commonConfig.js');

router.post('/market-place/add', function (req, res) { 
	let userCardId = req.body.id;
	let cardType = req.body.type;
	let cardTypeC = cardType.charAt(0).toUpperCase() + cardType.slice(1)
	let marketPlaceData = new sequelize.models.marketPlaces({
		userId:req.userId,
		userCardId:userCardId,
		cardType:cardType,
		marketValue:req.body.marketValue,
		purchased:0,
		boughtUser:0
	});
	marketPlaceData.save().then(marketPlace=>{
		sequelize.models['user'+cardTypeC+'Cards'].update({marketStatus:1},{where:{id:userCardId}}).then(userCard=>{
			res.send({ status:true, data:marketPlace, card:userCard, message: notificationMessages.market_listing });
		});
	})

})

router.post('/market-place/remove', function (req, res) { 
	sequelize.models.marketPlaces.findOne({where:{id:req.body.id}}).then(marketPlaceCard=>{
		if(marketPlaceCard != null){
			let cardType = marketPlaceCard.cardType;
			let cardTypeC = cardType.charAt(0).toUpperCase() + cardType.slice(1)
			sequelize.models['user'+cardTypeC+'Cards'].update({marketStatus:0, userId:req.userId},{where:{id:marketPlaceCard.userCardId}}).then(userPlayerCard=>{
				sequelize.models.marketPlaces.destroy({where:{id:req.body.id}}).then(marketPlaceCard=>{
					res.send({status:true, data:marketPlaceCard, message: notificationMessages.market_remove});
				});
			});
		} else {
			res.send({status:false, data:[], message:"Player not found"});
		}
	});

})

router.post('/market-place/buy', function (req, res) { 
	
	sequelize.models.marketPlaces.findOne({where:{id:req.body.id}}).then(marketPlaceCard=>{
		if(marketPlaceCard != null){
			let cardType = marketPlaceCard.cardType;
			let cardTypeC = cardType.charAt(0).toUpperCase() + cardType.slice(1)
			sequelize.models.steamUsers.findOne({where:{id:req.userId}}).then(buyingUserDetails=>{
				if(buyingUserDetails.coinsBalance > parseInt(marketPlaceCard.marketValue)){
					let deductedAmount = buyingUserDetails.coinsBalance - parseInt(marketPlaceCard.marketValue);
					sequelize.models['user'+cardTypeC+'Cards'].update({marketStatus:0, userId:req.userId},{where:{id:marketPlaceCard.userCardId}}).then(userPlayerCard=>{
						sequelize.models.steamUsers.update({coinsBalance:deductedAmount},{where:{id:req.userId}}).then(amountDeducted=>{
							let amount = (parseInt(marketPlaceCard.marketValue)*90)/100
							sequelize.models.steamUsers.findOne({where:{id:marketPlaceCard.userId}}).then(sellingUserDetails=>{
								let addedAmount = sellingUserDetails.coinsBalance + amount;
								sequelize.models.steamUsers.update({coinsBalance:addedAmount},{where:{id:marketPlaceCard.userId}}).then(amountAdded=>{
									sequelize.models.steamUsers.findOne({where:{id:req.userId}}).then(updatedUser=>{
										sequelize.models.marketPlaces.destroy({where:{id:req.body.id}}).then(marketPlaceCard=>{
											let historyData = new sequelize.models.histories({
												userId:req.userId,
												module:"market-place",
												amount:deductedAmount,
												credited:0,
												debited:1,
												description:notificationMessages.market_buy_history
											});
											historyData.save().then(()=>{
												let historyData = new sequelize.models.histories({
													userId:marketPlaceCard.userId,
													module:"market-place",
													amount:addedAmount,
													credited:1,
													debited:0,
													description:notificationMessages.market_sell.replace(/{X}/gi, addedAmount)
												});
												historyData.save().then(()=>{
													res.send({status:true, data:updatedUser, message: notificationMessages.market_buy});	
												});
												
											});
										});
										
									});
								}).catch(error=>{
									res.send({status:false, message:"errro while updating balance of owner user = "+error});
							    })
							});

						}).catch(error=>{
							res.send({status:false, message:"errro while updating balance of buying user = "+error});
					    })
					}).catch(error=>{
						res.send({status:false, message:"errro while updating market status of marketCard = "+error});
				    })
				}else{
					res.send({ status:false, message:notificationMessages.no_money });
				}
			}).catch(error=>{
					res.send({status:false, message:"errro while getting buying user = "+error});
		    })
		} else {
			res.send({status:false, message:"Player already purchased", data:[]});
		}
	}).catch(error=>{
		res.send({status:false, message:"errro while getting marketCard = "+error});
    })

})

var count = 0;
var data = {};
router.get('/market-place/:type', function (req, res) { 
	let cardType = req.params.type;
	sequelize.models.marketPlaces.findAll({where:{cardType: cardType}, include:[
			{ model:sequelize.models[itemsDetails[cardType].userCard], as:itemsDetails[cardType].userCard.slice(0, -1)+'Data', include:[
				{ model:sequelize.models[itemsDetails[cardType].card], as:itemsDetails[cardType].card.slice(0, -1)+'Data', include:
					itemsDetails[cardType].include
				},
			]}
		]}).then(marketPlace=>{
			if(cardType == 'boostTeam'){
				count = 1;
				getBoostType(marketPlace, req, res);
			}else{
				res.send({status:true, data:marketPlace, message:""});
			}
		})
		.catch(error=>{
			res.send({status:false, message:"ERROR = "+error});
	  })

	// sequelize.models.marketPlaces.findAll({include:[
	// 	{ model:sequelize.models.userPlayerCards, as:"userPlayerCardData", include:[
	// 		{ model:sequelize.models.playerCards, as:"playerCardData", include:[
	// 				{ model:sequelize.models.players, as:"playersData", include:[
	// 				{ model:sequelize.models.teams, as:"teamData" },
	// 				{ model:sequelize.models.country, as:"countryData" },
	// 			] },
	// 			{ model:sequelize.models.roles, as:"rolesData" },
	// 			{ model:sequelize.models.cardTypes, as:"cardTypesData" },
	// 			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" }
	// 		]},
	// 		{ model:sequelize.models.steamUsers, as:"userData"},
	// 		{ model:sequelize.models.maps, as:"mapData"}
	// 	]}
	// ]}).then(marketPlace=>{
	// 	res.send({status:true, data:marketPlace, message:""});
	// })
})

function getBoostType(cards, req, res){
	if(count > cards.length || cards.length==0){
		res.send({data:data, status:true, message:''+count});
	} else {
		data["boost_card_data_"+cards[count-1].id] = cards[count-1];
		if(cards[count-1].userBoostTeamCardData.boostTeamCardData.boostTypeId1 == 1){
			getBoostTypeOf1(cards, req, res, cards[count-1].userBoostTeamCardData.boostTeamCardData.boostTypeValue1, "maps");
		} else {
			getBoostTypeOf1(cards, req, res, cards[count-1].userBoostTeamCardData.boostTeamCardData.boostTypeValue1, "roles");
		}
		
	}
}

function getBoostTypeOf1(cards, req, res, id, module){
	
	sequelize.models[module].find({where:{id:id}}).then(boost_type_1_data=>{
		data["boost_card_type_"+cards[count-1].id+"_1"] = boost_type_1_data;
		if(cards[count-1].userBoostTeamCardData.boostTeamCardData.boostTypeId2 == 1){
			getBoostTypeOf2(cards, req, res, cards[count-1].userBoostTeamCardData.boostTeamCardData.boostTypeValue2, "maps")
		} else {
			getBoostTypeOf2(cards, req, res, cards[count-1].userBoostTeamCardData.boostTeamCardData.boostTypeValue2, "roles")
		}
	});
}

function getBoostTypeOf2(cards, req, res, id, module){
	
	sequelize.models[module].find({where:{id:id}}).then(boost_type_1_data=>{
		data["boost_card_type_"+cards[count-1].id+"_2"] = boost_type_1_data;
		if(cards[count-1].userBoostTeamCardData.boostTeamCardData.boostTypeId3 == 1){
			getBoostTypeOf3(cards, req, res, cards[count-1].userBoostTeamCardData.boostTeamCardData.boostTypeValue3, "maps")
		} else {
			getBoostTypeOf3(cards, req, res, cards[count-1].userBoostTeamCardData.boostTeamCardData.boostTypeValue3, "roles")
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



router.get('/check-maintain', function (req, res) { 
	sequelize.models.siteConfigurations.findOne({where:{site_key:'site_active'}}).then(config=>{
		if(config!=null){
			res.send({status:true, data:config.site_value, message:""});
		}
		
	})
})



module.exports = router; 