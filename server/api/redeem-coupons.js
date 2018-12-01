const router = require('express').Router();
const passport = require('passport');
const SteamStrategy = require('../../').Strategy;
var jwt = require('jsonwebtoken');
var config = require('../config.js');
var sequelize = require('../db.js');

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'
// Get All my packs

router.get('/coupons', function (req, res) { 
 
    sequelize.models.coupons.findAll().then(coupons => {
	    if(coupons.length > 0){
	      res.send({status:true, data:coupons, message:""});
	    } else {
	      res.send({status:false, message:"No coupon found !!"});
	    }
    })
})

router.post('/coupons', function (req, res) { 
 
    var newData = new sequelize.models.coupons({
    	title:req.body.title,
    	code:req.body.code,
    	value:req.body.value,
    	maxUses:req.body.maxUses,
    	uses:req.body.uses
    })

    newData.save().then(coupon => { 
        res.send({status:true, data:coupon, message:""});  
    }).catch(error => {
        res.send({status:false, error:error, message:""});
    });
})

router.get('/coupons/:id', function (req, res) {
    sequelize.models.coupons.find({where:{id:req.params.id}}).then(coupon => {
	    if(Object.keys(coupon).length > 0){
	      res.send({status:true, data:coupon, message:""});
	    } else {
	      res.send({status:false, message:"No coupon found !!"});
	    }
    });
})

router.post('/redeem-coupons', function (req, res) {
    sequelize.models.coupons.find({where:{code:req.body.code}, include:[
		    			{ model:sequelize.models.balanceTypes, as:"balanceTypeData" },
		    			{ model:sequelize.models.masterPacks, as:"masterPackData" },
		    		]}).then(singleCoupon => {
	    if(singleCoupon != null){
	    	sequelize.models.couponsHistory.find({where:{couponId:singleCoupon.id, userId:req.userId}}).then(couponsHistory=>{
	    		if(couponsHistory==null){
	    			if(singleCoupon.uses < singleCoupon.maxUses){
				    	sequelize.models.coupons.update({uses:singleCoupon.uses+1},{where:{code:req.body.code}}).then(coupon => {
				    		if(singleCoupon.balanceTypeData.label !== "packs"){
					    		sequelize.models.steamUsers.find({where:{id:req.userId}}).then(user => {
					    			var balance = user[singleCoupon.balanceTypeData.label] + singleCoupon.value;
						    		var userData = {};
						    		userData[ singleCoupon.balanceTypeData.label ] = balance;
						    		sequelize.models.steamUsers.update(userData, {where:{id:req.userId}}).then(updatedUser => {
						    			sequelize.models.steamUsers.find({where:{id:req.userId}}).then(updatedUser => {
						    				let couponsHistory = new sequelize.models.couponsHistory({
													userId: updatedUser.id ,
													couponId: singleCoupon.id
												});
												couponsHistory.save().then(history=>{
													let amountLabel = (singleCoupon.balanceTypeData.label).replace('Balance', '');
													let historyData = new sequelize.models.histories({
														userId:req.userId,
														module:"redeem-coupon-"+amountLabel,
														amount:singleCoupon.value,
														credited:1,
														debited:0,
														description:(notificationMessages.coupon_code_history).replace('{X}', singleCoupon.value).replace('{amount}', amountLabel)
													});
													historyData.save().then(()=>{
														res.send({status:true, data:{got:singleCoupon.balanceTypeData.label, user_info:updatedUser }, message:notificationMessages.coupon_code});
													});
												})
							    		}).catch(error => {
								        res.send({status:false, error:error, message:"User get failed !!"});
								    });	
						    		}).catch(error => {
							        res.send({status:false, error:error, message:"User update failed !!"});
							    	});	
				    			});
								} else {
									var packData = new sequelize.models.packs({
										masterPackId: singleCoupon.masterPackId ,
										owned: req.userId,
										openAt: new Date().toJSON().slice(0, 19).replace('T', ' '),
										opened: 0
									});
									packData.save().then(pack => {
										sequelize.models.steamUsers.find({where:{id:req.userId}}).then(user => {
					    				let couponsHistory = new sequelize.models.couponsHistory({
												userId: req.userId,
												couponId: singleCoupon.id
											});
											couponsHistory.save().then(history=>{
												let amountLabel = 'pack';
												let historyData = new sequelize.models.histories({
													userId:req.userId,
													module:"redeem-coupon-"+amountLabel,
													amount:singleCoupon.value,
													credited:1,
													debited:0,
													description:(notificationMessages.coupon_code_history).replace('{X}', 1).replace('{amount}', amountLabel)
												});
												historyData.save().then(()=>{
													res.send({status:true, data:{got:singleCoupon.balanceTypeData.label, user_info:user }, message:notificationMessages.coupon_code});
												});
											}	);
										});
									});
								}
				    	}).catch(error => {
					        res.send({status:false, error:error, message:"Some error occured, please try again."});
					    });
				    } else {
				    	res.send({status:false, message:"Coupon is already overused"});
				    }
	    		} else {
	    			res.send({status:false, message:"Coupon already applied."})
	    		}
	    	});
	    } else {
	    	res.send({status:false, message:"No coupon found !!"});
	    }
    });
});

module.exports = router;
