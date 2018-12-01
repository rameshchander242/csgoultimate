const router = require('express').Router();
const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = require('../db.js');

var formLevel = [2,4,6,8,10];
var itemsDetails = {
	1:{
		name:"players", 
		card:"playerCards",
		data:"playersData",
		chance:"4.5",
		include:[
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
			{ model: sequelize.models.cardTypes, as:"cardTypesData" },
			{ model:sequelize.models.roles, as:"rolesData" },
			{ model:sequelize.models.players, as:"playersData", include:[
				{ model:sequelize.models.teams, as:"teamData" },
				{ model:sequelize.models.country, as:"countryData" }
			] }
		]
	}, 
	2:{
		name:"coaches", 
		card:"coachCards",
		data:"coachData",
		chance:"1.5",
		include:[
			{ model:sequelize.models.boostTypes, as:"boostTypeData" },
			{ model:sequelize.models.boostRoleCards, as:"boostRoleCardsData", include:[
				{ model:sequelize.models.roles, as:"rolesData" }
			]},
			{ model:sequelize.models.boostMapCards, as:"boostMapCardsData", include:[
				{ model:sequelize.models.maps, as:"mapsData" }
			]},
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
			{ model: sequelize.models.cardTypes, as:"cardTypesData"},
			{ model:sequelize.models.coaches, as:"coachData", include:[
				{ model:sequelize.models.teams, as:"teamData" },
				{ model:sequelize.models.country, as:"countryData" }
			]}
		]
	},
	3:{
		name:"fitness",
		card:"fitnessCards",
		data:"fitnessData",
		chance:"1.6",
		include:[
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
			{ model: sequelize.models.cardTypes, as:"cardTypesData" }
		]
	},
	4:{
		name:"contract", 
		card:"contractCards",
		data:"contractData",
		chance:"1.6",
		include:[
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" }
		]
	}, 
	5:{
		name:"switchMapCards", 
		card:"switchMapCards",
		data:"switchMapCardData",
		chance:"1.6",
		include:[
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
			{ model:sequelize.models.maps, as:"toMapData" },
			// { model:sequelize.models.maps, as:"fromMapData" },
			{ model:sequelize.models.cardTypes, as:"cardTypesData"},
		]
	}, 
	6:{
		name:"switchRoleCards", 
		card:"switchRoleCards",
		data:"switchRoleCardData",
		chance:"1.6",
		include:[
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
			{ model:sequelize.models.roles, as:"rolesData" },
			{ model:sequelize.models.cardTypes, as:"cardTypesData"},
		]
	}, 7:{
		name:"boostRoleCards", 
		card:"boostRoleCards",
		data:"boostRoleCardData",
		chance:"1.6",
		include:[
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
			{ model:sequelize.models.roles, as:"rolesData" },
			{ model:sequelize.models.cardTypes, as:"cardTypesData"},
		]
	}, 8:{
		name:"boostMapCards", 
		card:"boostMapCards",
		data:"boostMapCardData",
		chance:"1.6",
		include:[
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
			{ model:sequelize.models.maps, as:"mapsData" },
			{ model:sequelize.models.cardTypes, as:"cardTypesData"},
		]
	}, 9:{
		name:"boostTeamCards", 
		card:"boostTeamCards",
		data:"boostTeamCardData",
		chance:"1.6",
		include:[
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
			{ model:sequelize.models.cardTypes, as:"cardTypesData"},
			{ model:sequelize.models.teams, as:"teamData" }
		]
	}, 
};

var allItems = {};
// Get All my packs
router.get('/my-packs', function (req, res) { 
	sequelize.models.packs.findAll({where:{owned:req.userId, opened:0}, include:[{ model:sequelize.models.masterPacks, as:"masterPackData" }]}).then(packs => {
	    if(packs.length > 0){
			res.send({ status:true, data:packs, length:packs.length});
	    } else {
			res.send({ status:false, message:"No packs found !!" });
	    }
    });
}); 

/* API call function to open a pack with packId in url */
router.get('/open-packs/:id', function (req, res) { 
	var j={};
	var itemCountCheck = {};
	var numberOfItems = {};
	var randomPoolNumber;
	var randomNumber;
	let boostTeamCardDetails = {boostTeamcardId:0, type_1:{}, type_2:{}, type_3:{}, indicator:"boostTeamCardData"};
	var items;
	var itemsChanceData = [];
	var itemsList = {cards:[], cardDetailsData:{}};
	itemCountCheck[req.userId] = 0;
	sequelize.models.packs.find({where:{id:req.params.id}, include:[
		{ model:sequelize.models.masterPacks, as:"masterPackData", include:[
			{ model:sequelize.models.cardTypes, as:"cardTypeData" },
		]}
	]}).then(packs=>{
		j[req.userId]=0;
		if(packs.opened == 0){
			
			/* Store final number of items to be displayed in pack */
			numberOfItems[req.userId] = packs.masterPackData.cardAmount;
			
			/* Following code will create chance of every Item in opening pack */
			items =  packs.masterPackData.packItems.split(",");
			// res.send({items:items});
			if(packs.masterPackData.minimumPlayerAmount !== 0){
				getMinimumItems(items, res, req, packs);
			} else {
				getCards(items, res, req, packs);
			}
		} else {
			res.send({status: false, message: "Pack already opened.", data:[]});
		}

	});
	function getCards(itemsChanceData, res, req, packs){

			if( j[req.userId] == itemsChanceData.length ){
				if(itemsList.cards.length == numberOfItems[req.userId]){
					sequelize.models.packs.update({opened:1}, {where:{id:packs.id}}).then(()=>{

						// res.send({data:itemsList, message:"", status:true});
						getBoostType(itemsList, res, req);
					});
				} else {
					sequelize.models.maps.count().then(mapCount=>{
						randomNumber = Math.floor(Math.random() * 100) + 1;

						if(randomNumber > 0 && randomNumber<=20){
							if(itemsChanceData.indexOf('1') > -1){
								getItems(req, res, allItems["players"], packs, mapCount, allItems["players"].poolSize, "players", allItems["players"].card);
							} else {
								getCards(itemsChanceData, res, req, packs);
							}
						} else if(randomNumber > 20 && randomNumber<=25){
							if(itemsChanceData.indexOf('2') > -1){
								getItems(req, res, allItems["coaches"], packs, mapCount, allItems["coaches"].poolSize, "coaches", allItems["coaches"].card);
							} else {
								getCards(itemsChanceData, res, req, packs);
							}
						} else if(randomNumber > 25 && randomNumber<=47){
							if(itemsChanceData.indexOf('3') > -1){
								getItems(req, res, allItems["fitness"], packs, mapCount, allItems["fitness"].poolSize, "fitness", allItems["fitness"].card);
							} else {
								getCards(itemsChanceData, res, req, packs);
							}
						} else if(randomNumber > 47 && randomNumber<=73){
							if(itemsChanceData.indexOf('4') > -1){
								getItems(req, res, allItems["contract"], packs, mapCount, allItems["contract"].poolSize, "contract", allItems["contract"].card);
							} else {
								getCards(itemsChanceData, res, req, packs);
							}
						} else if(randomNumber > 73 && randomNumber <= 74){
							if(itemsChanceData.indexOf('5') > -1){
								getItems(req, res, allItems["switchRoleCards"], packs, mapCount, allItems["switchRoleCards"].poolSize, "switchRoleCards", allItems["switchRoleCards"].card);
							} else {
								getCards(itemsChanceData, res, req, packs);
							}
						} else if(randomNumber > 74 && randomNumber<=75){
							if(itemsChanceData.indexOf('6') > -1){
								getItems(req, res, allItems["switchMapCards"], packs, mapCount, allItems["switchMapCards"].poolSize, "switchMapCards", allItems["switchMapCards"].card);
							} else {
								getCards(itemsChanceData, res, req, packs);
							}
						} else if(randomNumber > 75 && randomNumber<=90){
							if(itemsChanceData.indexOf('7') > -1){
								getItems(req, res, allItems["boostRoleCards"], packs, mapCount, allItems["boostRoleCards"].poolSize, "boostRoleCards", allItems["boostRoleCards"].card);
							} else {
								getCards(itemsChanceData, res, req, packs);
							}
						} else if(randomNumber > 90 && randomNumber<=95){
							if(itemsChanceData.indexOf('8') > -1){
								getItems(req, res, allItems["boostMapCards"], packs, mapCount, allItems["boostMapCards"].poolSize, "boostMapCards", allItems["boostMapCards"].card);
							} else {
								getCards(itemsChanceData, res, req, packs);
							}
						} else if(randomNumber > 95 && randomNumber<=100){
							if(itemsChanceData.indexOf('9') > -1){
								getItems(req, res, allItems["boostTeamCards"], packs, mapCount, allItems["boostTeamCards"].poolSize, "boostTeamCards", allItems["boostTeamCards"].card);
							} else {
								getCards(itemsChanceData, res, req, packs);
							}
						} 
					});
				}
			} else {
				sequelize.models[itemsDetails[ parseInt(itemsChanceData[j[req.userId]]) ].card].findAll({include:itemsDetails[ parseInt(itemsChanceData[j[req.userId]]) ].include}).then( items => {
					sequelize.query("select sum(rarityLevels.rarityValue) as total from "+itemsDetails[ parseInt(itemsChanceData[j[req.userId]]) ].card+" LEFT JOIN rarityLevels on "+itemsDetails[ parseInt(itemsChanceData[j[req.userId]]) ].card+".rarityLevelId = rarityLevels.id").then(poolSize=>{
						let itemData = { data:items, poolSize: poolSize[0][0].total, card:itemsDetails[ parseInt(itemsChanceData[j[req.userId]]) ].card};
						allItems[itemsDetails[ parseInt(itemsChanceData[j[req.userId]]) ].name] = itemData;
						j[req.userId]++;
						getCards(itemsChanceData, res, req, packs);
					});
				});

			}
		}

		function getItems(req, res, itemData, packs, mapCount, poolSize, itemName, card){
			var lastvalue = 0;
			let itemFound = false;
			var userItemData;
			randomPoolNumber = Math.floor(Math.random() * poolSize) + 1;
			var cardDetails = {};
			for(var i = 0; i<itemData.data.length; i++){

				var randomMap = Math.floor(Math.random() * mapCount) + 1;
				lastvalue = lastvalue+itemData.data[i].rarityLevelsData.rarityValue;
				if(lastvalue >= randomPoolNumber){

					let condition = Math.round(Math.random() * 1000000) / 1000000;
					cardDetails = { card:itemData.data[i], indicator:itemName, mapId:randomMap, condition:condition, packData:packs };
					itemsList.cards.push(cardDetails);
					if(itemName == "players"){
						userItemData = new sequelize.models.userPlayerCards({
							receivedAt:new Date().toJSON().slice(0, 19).replace('T', ' '),
							userId:req.userId,
							playerCardId:itemData.data[i].id,
							packId:packs.id,
							formLevel:formLevel[Math.floor(Math.random() * formLevel.length)],
							favouriteMapId:randomMap,
							condition:condition
						});
					} else if(itemName == "coaches"){
						userItemData = new sequelize.models.userCoachCards({
							receivedAt:new Date().toJSON().slice(0, 19).replace('T', ' '),
							userId:req.userId,
							coachCardId:itemData.data[i].id,
							packId:packs.id,
							formLevel:formLevel[Math.floor(Math.random() * formLevel.length)],
							condition:condition
						});
					} else if(itemName == "fitness"){
						userItemData = new sequelize.models.userFitnessCards({
							receivedAt:new Date().toJSON().slice(0, 19).replace('T', ' '),
							userId:req.userId,
							fitnessCardId:itemData.data[i].id,
							packId:packs.id,
							formLevel:10,
							condition:condition
						});
					}else if(itemName == "contract"){
						userItemData = new sequelize.models.userContractCards({
							receivedAt:new Date().toJSON().slice(0, 19).replace('T', ' '),
							userId:req.userId,
							contractCardId:itemData.data[i].id,
							packId:packs.id,
							formLevel:10,
							condition:condition
						});
					} else if(itemName == "switchMapCards"){
						userItemData = new sequelize.models.userSwitchMapCards({
							// receivedAt:new Date().toJSON().slice(0, 19).replace('T', ' '),
							userId:req.userId,
							switchMapCardId:itemData.data[i].id,
							packId:packs.id
						});
					} else if(itemName == "switchRoleCards"){
						userItemData = new sequelize.models.userSwitchRoleCards({
							// receivedAt:new Date().toJSON().slice(0, 19).replace('T', ' '),
							userId:req.userId,
							switchRoleCardId:itemData.data[i].id,
							packId:packs.id,
						});
					} else if(itemName == "boostRoleCards"){
						userItemData = new sequelize.models.userBoostRoleCards({
							// receivedAt:new Date().toJSON().slice(0, 19).replace('T', ' '),
							userId:req.userId,
							boostRoleCardId:itemData.data[i].id,
							packId:packs.id,
						});
					} else if(itemName == "boostMapCards"){
						userItemData = new sequelize.models.userBoostMapCards({
							// receivedAt:new Date().toJSON().slice(0, 19).replace('T', ' '),
							userId:req.userId,
							boostMapCardId:itemData.data[i].id,
							packId:packs.id,
						});
					} else if(itemName == "boostTeamCards"){
						userItemData = new sequelize.models.userBoostTeamCards({
							receivedAt:new Date().toJSON().slice(0, 19).replace('T', ' '),
							userId:req.userId,
							teamBoostCardId:itemData.data[i].id,
							packId:packs.id,
						});
					}
					itemFound = true;
					break;
				}
			}
			if(itemFound == true){
				userItemData.save().then(card=>{
					getCards(items, res, req, packs);
			    }).catch(error => {
			    	console.log(error);
			    });
			}
		}

		function getMinimumItems(items, res, req, packs){
			let _data = [];
			
			var tableData = [];
			sequelize.models.playerCards.findAll({include:itemsDetails['1'].include}).then( item => {
				sequelize.query("select sum(rarityLevels.rarityValue) as total from playerCards LEFT JOIN rarityLevels on playerCards.rarityLevelId = rarityLevels.id").then(poolSize=>{
					sequelize.models.maps.count().then(mapCount=>{
						for(var k = 0; k < packs.masterPackData.minimumPlayerAmount; k++){
							var lastvalue = 0;
							randomPoolNumber = Math.floor(Math.random() * poolSize[0][0].total) + 1;
							for(var i = 0; i < item.length; i++){
								var randomMap = Math.floor(Math.random() * mapCount) + 1;
								lastvalue = lastvalue+item[i].rarityLevelsData.rarityValue;
								if(lastvalue >= randomPoolNumber){
									let condition = Math.round(Math.random() * 1000000) / 1000000;
									let cardDetails = { card:item[i], indicator:"players", "mapId":randomMap, "condition":condition, packData:packs };
									itemsList.cards.push(cardDetails);
									tableData.push({
										receivedAt:new Date().toJSON().slice(0, 19).replace('T', ' '),
										userId:req.userId,
										playerCardId:item[i].id,
										packId:packs.id,
										formLevel:formLevel[Math.floor(Math.random() * formLevel.length)],
										favouriteMapId:randomMap,
										condition:condition
									});
									itemFound = true;
									break;
								}
							}
							if(itemsList.cards.length == packs.masterPackData.minimumPlayerAmount){
								sequelize.models.userPlayerCards.bulkCreate(tableData).then(card=>{
									getCards(items,res, req, packs);
							    }).catch(error => {
							    	console.log(error)
							    });
							}
						}
					});
				});
			});
		}

		function getBoostType(itemsList, res, req){
			if((itemCountCheck[req.userId]) == itemsList.cards.length){
				let historyData = new sequelize.models.histories({
					userId:req.userId,
					module:"pack-opening",
					amount:0,
					credited:0,
					debited:0,
					description:notificationMessages.pack_opened
				});
				historyData.save().then(()=>{
					res.send({data:itemsList, message:notificationMessages.pack_opened, status:true});
				})
			} else {
				if(itemsList.cards[itemCountCheck[req.userId]].indicator == "boostTeamCards"){
					if(itemsList.cards[itemCountCheck[req.userId]].card.boostTypeId1 == 1){
						getBoostTypeOf1(itemsList, req, res, itemsList.cards[itemCountCheck[req.userId]].card.boostTypeValue1, "maps");
					} else {
						getBoostTypeOf1(itemsList, req, res, itemsList.cards[itemCountCheck[req.userId]].card.boostTypeValue1, "roles");
					}
				} else {
					itemCountCheck[req.userId] = itemCountCheck[req.userId] + 1;
					getBoostType(itemsList, res, req);	
				}

			}
		}

		function getBoostTypeOf1(itemsList, req, res, id, module){
			
			sequelize.models[module].find({where:{id:id}}).then(boost_type_data=>{
				
				itemsList.cardDetailsData["boost_card_type_"+itemsList.cards[itemCountCheck[req.userId]].card.id+"_1"] = boost_type_data;
				
				if(itemsList.cards[itemCountCheck[req.userId]].card.boostTypeId2 == 1){
					getBoostTypeOf2(itemsList, req, res, itemsList.cards[itemCountCheck[req.userId]].card.boostTypeValue2, "maps")
				} else {
					getBoostTypeOf2(itemsList, req, res, itemsList.cards[itemCountCheck[req.userId]].card.boostTypeValue2, "roles")
				}
			});
		}

		function getBoostTypeOf2(itemsList, req, res, id, module){
			
			sequelize.models[module].find({where:{id:id}}).then(boost_type_data=>{
				itemsList.cardDetailsData["boost_card_type_"+itemsList.cards[itemCountCheck[req.userId]].card.id+"_2"] = boost_type_data
				if(itemsList.cards[itemCountCheck[req.userId]].card.boostTypeId3 == 1){
					getBoostTypeOf3(itemsList, req, res, itemsList.cards[itemCountCheck[req.userId]].card.boostTypeValue3, "maps")
				} else {
					getBoostTypeOf3(itemsList, req, res, itemsList.cards[itemCountCheck[req.userId]].card.boostTypeValue3, "roles")
				}
			});
		}

		function getBoostTypeOf3(itemsList, req, res, id, module){
			
			sequelize.models[module].find({where:{id:id}}).then(boost_type_data=>{
				itemsList.cardDetailsData["boost_card_type_"+itemsList.cards[itemCountCheck[req.userId]].card.id+"_3"] = boost_type_data
				itemCountCheck[req.userId] = itemCountCheck[req.userId] + 1;
				getBoostType(itemsList, res, req);	
			});
		}
	});

		

module.exports = router;