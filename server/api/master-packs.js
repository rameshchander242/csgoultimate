const router = require('express').Router();

const Sequelize = require('sequelize');
var config = require('../config.js');

var sequelize = require('../db.js');

// Get all my packs
router.get('/master-packs', function (req, res) { 
	let query = {};

	// filter by card type
	if(req.query.packTabId) {
		query.packTabId = req.query.packTabId;
	}
    sequelize.models.masterPacks.findAll({where:{active:1},include:[
    		{model: sequelize.models.cardTypes, as:"cardTypeData",},
    		{model: sequelize.models.packTabs, as:"packTabData",}
    	], where:query}).then(packs => {
	    if(packs.length > 0){
			res.send({status:true, data:packs});  
	    } else {
			res.send({status:false, message: notificationMessages.No_packs_available });
	    }
    });
});

// Get all my packs
router.get('/master-packs/:id', function (req, res) { 

    sequelize.models.masterPacks.findAll({where:{masterPackTypeId:req.params.id}}).then(packs => {
	    if(packs.length > 0){
	      res.send({status:true, data:packs});  
	    } else {
	      res.send({status:false, message:notificationMessages.No_masterpack_available });
	    }
    });
});

router.post('/master-packs', function (req, res) { 
	var newData = new sequelize.models.masterPacks({
		cardTypeId : req.body.cardTypeId,
		label:req.body.label,
		imageUrl:req.body.imageUrl,
		coinPrice:req.body.coinPrice,
		pointPrice:req.body.pointPrice,
		cardAmount:req.body.cardAmount,
		minimumGoldAmount:req.body.minimumGoldAmount,
		minimumPlayerAmount:req.body.minimumPlayerAmount,
	});
	
    newData.save().then(pack => { 
		res.send({status:true, data:pack});  
    }).catch(error => {
		res.send({status:false, error:error});
	});
})

router.post('/buy-packs', function (req, res) { 
 
    sequelize.models.masterPacks.find({where:{id:req.body.pack_id}}).then(masterPack => {
		
	    if(masterPack != null){

	      	sequelize.models.steamUsers.find({where:{id:req.userId}}).then(user => {

			    if(Object.keys(user).length > 0){
			    	var totalAmount = 0;
			    	var label = ""
			    	if(req.body.balance == "coinsBalance"){
			    		totalAmount = req.body.qty * masterPack.coinPrice;	
			    		label = "coins"
			    	} else {
			    		totalAmount = req.body.qty * masterPack.pointPrice;
			    		label = "points"
			    	}
			    	
			    	if(totalAmount <= user[req.body.balance]){
			    		var balance = user[req.body.balance] - totalAmount;
			    		var userData = {};
			    		userData[ req.body.balance ] = balance;
			    		sequelize.models.steamUsers.update(userData, {where:{id:req.userId}}).then(updateUser => {
			    			
			    			var packData = [];
			    			for(var i=0; i<req.body.qty; i++){
			    				packData.push({
									masterPackId: req.body.pack_id ,
									owned: req.userId ,
									openAt: new Date().toJSON().slice(0, 19).replace('T', ' '),
									opened: 0
								});
			    			}
			    			
			    			sequelize.models.packs.bulkCreate(packData).then(pack => {
			    				if(Object.keys(pack).length > 0){
			    					let historyData = new sequelize.models.histories({
										userId:req.userId,
										module:"buy-pack-"+label,
										amount:totalAmount,
										credited:0,
										debited:1,
										description:(notificationMessages.buy_pack).replace('{X}', req.body.qty)
									});
									historyData.save().then(()=>{
			    						sequelize.models.steamUsers.find({where:{id:req.userId}}).then(updatedUser => {
			    							res.send({status : true, data:updatedUser, message:(notificationMessages.buy_pack).replace('{X}', req.body.qty) });
			    						});
			    					});
			    				}
			    			}).catch(function (err) {
							  res.send({status : false, err:err});
							});
			    		})
			    	} else {
			    		res.send({status:false, message:notificationMessages.no_money});
			    	}
			    } else {
					res.send({status:false, message:notificationMessages.No_user_found});
			    }
		    }); 
	    } else {
			res.send({status:false, message:notificationMessages.No_masterpack_available});
	    }
    });

});

module.exports = router;
