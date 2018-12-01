const router = require('express').Router();
const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = require('../db.js');
const Op = Sequelize.Op;

router.post('/item-quick-sell', function (req, res) { 
	let cardType = req.body.type
	let cardTypeC = cardType.charAt(0).toUpperCase() + cardType.slice(1)

	sequelize.models['user'+cardTypeC+'Cards'].find({where:{id:req.body.id}, 
	 	include:[
		{ model:sequelize.models[cardType+'Cards'], as: cardType+"CardData", include:[
			{ model:sequelize.models.rarityLevels, as:"rarityLevelsData" }
		]}
	]
	}).then(userCard => {
		sequelize.models.steamUsers.find({where:{id:req.userId}}).then(user=>{
			sequelize.models.steamUsers.update({coinsBalance:user.coinsBalance+userCard[cardType+'CardData'].rarityLevelsData.quickSellValue},{where:{id:req.userId}}).then(updatedUser=>{
				sequelize.models['user'+cardTypeC+'Cards'].destroy({where :{id:req.body.id}}).then(deletedCard=>{
					sequelize.models.steamUsers.find({where:{id:req.userId}}).then(updatedUser=>{
						let historyData = new sequelize.models.histories({
							userId:req.userId,
							module:cardType+"-sold-coins",
							amount:userCard[cardType+'CardData'].rarityLevelsData.quickSellValue,
							credited:1,
							debited:0,
							description: (notificationMessages.quicksell_history).replace(/{X}/gi, cardType)
							//description: (notification_data.description).replace(/{X}/gi, userCard[cardType+'CardData'].rarityLevelsData.quickSellValue)
						});
						historyData.save().then(()=>{
							res.send({status:true, data:updatedUser, message:(notificationMessages.quicksell).replace(/{X}/gi, userCard[cardType+'CardData'].rarityLevelsData.quickSellValue)});
						});
					})
				})
			})
		})
    })
})


function history_notification(notification_slug){
	return sequelize.models.notificationMessages.find({where:{slug:notification_slug}});
}

module.exports = router; 