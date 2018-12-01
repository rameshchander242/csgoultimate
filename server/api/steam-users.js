const router = require('express').Router();
const passport = require('passport');
const SteamStrategy = require('../../').Strategy;
const SteamAPI = require('steamapi');
const steam = new SteamAPI('F2A485362369B45A3956EAC94D3889ED');
var jwt = require('jsonwebtoken');
var config = require('../config.js');
var sequelize = require('../db.js');
var code = "";
var userId = "";
var cron = require('node-cron');
const host = process.env.HOST;
const port = process.env.PORT;
const hosturl = process.env.HOSTURL;
const https = require('https');
// Get All my packs 
router.get('/steam-users', function (req, res) { 
    sequelize.models.steamUsers.find({where : {id:req.userId}}).then(users => {
      if(users!=null){
        res.send({status:true, data:users, message:""});  
      } else {
        res.send({status:false, message:notificationMessages.No_user_found});
      }
    })
});

router.get('/steam-users/tos', function (req, res) { 
	sequelize.models.steamUsers.update({ tos:1 },{where : {id:req.userId}}).then(users => {
		res.send({status:true, data:users, message:""}); 
	})
});
router.get('/card-count-list', function (req, res) { 
	sequelize.models.userPlayerCards.count({where:{userId:req.userId, marketStatus:0}}).then(playerCount => {
		sequelize.models.userCoachCards.count({where:{userId:req.userId, marketStatus:0}}).then(coachCount => {
			sequelize.models.userFitnessCards.count({where:{userId:req.userId, marketStatus:0}}).then(fitnessCount => {
				sequelize.models.userContractCards.count({where:{userId:req.userId, marketStatus:0}}).then(contractCount => {
					sequelize.models.userBoostMapCards.count({where:{userId:req.userId, marketStatus:0}}).then(boostMapCount => {
						sequelize.models.userBoostRoleCards.count({where:{userId:req.userId, marketStatus:0}}).then(boostRoleCount => {
							sequelize.models.userSwitchMapCards.count({where:{userId:req.userId, marketStatus:0}}).then(switchMapCount => {
								sequelize.models.userSwitchRoleCards.count({where:{userId:req.userId, marketStatus:0}}).then(switchRoleCount => {
									sequelize.models.userBoostTeamCards.count({where:{userId:req.userId, marketStatus:0}}).then(boostTeamCount => {
										let countList = {
											'playerCount': playerCount, 
											'coachCount': coachCount, 
											'fitnessCount': fitnessCount, 
											'contractCount': contractCount, 
											'boostMapCount': boostMapCount, 
											'boostRoleCount': boostRoleCount, 
											'switchMapCount': switchMapCount, 
											'switchRoleCount': switchRoleCount, 
											'boostTeamCount': boostTeamCount, 
										}
										res.send({status:true, data:countList, message:""});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});

cron.schedule('58 23 * * *', () => {

	// sequelize.models.steamUsers.findAll({where:{banned:0}}).then(allUsers=>{
	// 	let i = 0;
	// 	getsteamId(allUsers, i);
	// })

	function getsteamId(allUsers, i){
		console.log(i);
		if(i == (allUsers.length - 1)){
			console.log("cron complete");
		} else {
			i = i+1;
			let url = allUsers[i].profileUrl;
			if(url.indexOf("profiles") > -1){
				checkUser(allUsers, i, url.split("profiles")[1]);
			} else {
				getsteamId(allUsers, i);
			}
		}
	}

	function checkUser(allUsers, i, steamId){	
		https.get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=F2A485362369B45A3956EAC94D3889ED&format=json&steamids="+steamId, (resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
			resp.on('end', () => {
				let userName = JSON.parse(data).response.players[0].personaname.replace(/ /g,'').toLowerCase();
				let domainStatus = userName.indexOf("csgoultimate.gg");
				if(domainStatus > -1){
					sequelize.models.rewards.findOne({where:{slug:'steam_name'}}).then(rewards=>{
						sequelize.models.steamUsers.update({pointsBalance:rewards.pointsBalance, coinsBalance:rewards.pointsBalance}, {where:{id:allUsers[i].id}}).then(updateUser=>{
							var history = [];
							if(rewards.pointsBalance > 0){
								history.push({
									userId:allUsers[i].id,
									module:"steam-name-points",
									amount:rewards.pointsBalance,
									credited:1,
									debited:0,
									description:"Steam name reward - "+rewards.pointsBalance+" points added to your account"
								});
							} else if (rewards.coinsBalance > 0){
								history.push({
									userId:allUsers[i].id,
									module:"steam-name-points",
									amount:rewards.pointsBalance,
									credited:1,
									debited:0,
									description:"Steam name reward - "+rewards.coinsBalance+" coins added to your account"
								});
							}
							if(rewards.pack>0){
								let packData = new sequelize.models.packs({
									masterPackId: rewards.pack ,
									owned: allUsers[i].id ,
									openAt: new Date().toJSON().slice(0, 19).replace('T', ' '),
									opened: 0
								});
								packData.save().then(pack=>{
									history.push({
										userId:allUsers[i].id,
										module:"steam-name-points",
										amount:rewards.pointsBalance,
										credited:1,
										debited:0,
										description:notificationMessages.steam_name_reward
									});
									sequelize.models.histories.bulkCreate(history).then(history=>{
										getsteamId(allUsers, i);
									});
									
								});
							} else {
								getsteamId(allUsers, i);
							}
						});
					});
				} else {
					getsteamId(allUsers, i);
				}
			});
		});
	}
});

router.put('/steam-users', function (req, res) { 
    sequelize.models.steamUsers.update({customEmail:req.body.email}, {where : {id:req.userId}}).then(users => {
        res.send({status:true, message:notificationMessages.email_update});
    }).catch(error=>{
		res.send({status:false, message:notificationMessages.try_again});
    });
});

router.post('/steam-users', function (req, res) { 
 
    var newUser = new sequelize.models.steamUsers({
        steamId : req.body.steamId,
        displayName:req.body.displayName,
        profileUrl:req.body.profileUrl,
        avatar:req.body.avatar,
        pointsBalance:req.body.pointsBalance,
        coinsBalance:req.body.coinsBalance,
        customEmail:req.body.customEmail
    });
  
    newUser.save().then(user => { 
        res.send({status:true, data:user});  
    }).catch(error => {
        res.send({status:false, error:error});
    });
});

router.use(function (req, res, next) {
	if(typeof req.userId == "undefined"){
		next();
	} else {
		sequelize.models.steamUsers.find({where:{id:req.userId}}).then(user=>{
			if(user.banned){
				return { status:false, message:notificationMessages.user_banned, data:[], userBanned:true };
			} else {
				next();
			}
		});
	}
});

passport.use(new SteamStrategy({
    returnURL: 'http://'+hosturl+'/auth/steam/return',
    realm: 'http://'+hosturl+'/',
    apiKey: 'F2A485362369B45A3956EAC94D3889ED'
	},function(identifier, profile, done) {
		process.nextTick(function () {
			profile.identifier = identifier;
			var reqdata = {
		        'coinsBalance': 1000, 
		        'pointsBalance': 200,
		        'steamId': parseFloat(profile._json.steamid),
		        'displayName': profile._json.personaname,
		        'profileUrl': profile._json.profileurl,
		        'avatar': profile._json.avatarfull,
		        'customEmail': 'default@gmail.com',
		        'referalCode': makeid(),
		        'banned' : 0,
		        'userTypeId' : 4,
		        'tos' : 0
			};
			sequelize.models.steamUsers.findOne({ where: {steamId: reqdata.steamId} }).then(users => {
				
				if(users != null){

					sequelize.models.siteConfigurations.findOne({where:{site_key:'site_active'}}).then(mode=>{
						if(!mode.site_value){
							if(users.userTypeId == 3){
								sequelize.models.steamUsers.update({displayName:reqdata.displayName, avatar:reqdata.avatar},{ where: {steamId: reqdata.steamId} }).then(users => {
						      		if(Object.keys(users).length > 0){
						        		sequelize.models.steamUsers.find({ where: {steamId: reqdata.steamId} }).then(users => {

						        			let token =  jwt.sign({ userId: users.id, newUser:false }, config.authTokenSuperSecret, {expiresIn: config.authTokenExpiresIn}); // expires in 24 hours  

						                    let retrunInfo = { status:true, bannedUser:false, token:token, users:users, message:""};
						                    
						                    return done(null, retrunInfo);

						        		}).catch(error=>{
							    			console.log("Error while finding user in if "+error);
							    		});
						        	} else {
						        		console.log("user not updated.");
						        	}
					    		}).catch(error=>{
					    			console.log("Error while updating user in if "+error);
					    		});	
							} else {
								let retrunInfo = { status:false, maintenanceMode:true, message:notificationMessages.maintenance_mode };
								return done(null, retrunInfo);
							}
						} else {
							if(users.banned){
								let retrunInfo = {status:false, bannedUser:false, users:users, message:notificationMessages.user_banned };
						        return done(null, retrunInfo);
							} else {
				        		sequelize.models.steamUsers.update({displayName:reqdata.displayName, avatar:reqdata.avatar},{ where: {steamId: reqdata.steamId} }).then(users => {
						      		if(Object.keys(users).length > 0){
						        		sequelize.models.steamUsers.find({ where: {steamId: reqdata.steamId} }).then(users => {

						        			let token = jwt.sign({ userId: users.id, newUser:false }, config.authTokenSuperSecret, {expiresIn: config.authTokenExpiresIn}); // expires in 24 hours  
						                    let retrunInfo = {status:true, bannedUser:false, users:users, token:token, message:""};
						                    return done(null, retrunInfo);

						        		}).catch(error=>{
							    			console.log("Error while finding user in if "+error);
							    		});
						        	} else {
						        		console.log("user not updated.");
						        	}
					    		}).catch(error=>{
					    			console.log("Error while updating user in if "+error);
					    		});
					    	}
						}
					})
	        	} else {
	        		if(code!==""){

	        			sequelize.models.steamUsers.find({where:{referalCode:code}}).then(users=>{
	        				sequelize.models.referralHistories.find({where:{referralUser:users.steamId, referedUser:reqdata.steamId}}).then(data=>{
		        				let addUpBalance = 0;
		        				if(data == null){

		        					reqdata.pointsBalance = 600;
		        					addUpBalance = 200;
		        					var newUser = new sequelize.models.steamUsers(reqdata);
									newUser.save().then(user => { 
										let newUser = user.id;
								        let token =  jwt.sign({ userId: user.id }, config.authTokenSuperSecret, {expiresIn: config.authTokenExpiresIn}); // expires in 24 hours  
											sequelize.models.steamUsers.find({where:{ referalCode:code }}).then(user=>{
												sequelize.models.steamUsers.update({pointsBalance:user.pointsBalance+addUpBalance},{where:{id:user.id}}).then(()=>{
													let referralData = new sequelize.models.referralHistories({
														referralUser:user.steamId,
														referedUser:reqdata.steamId,
														code:code,
													});
													referralData.save().then(referdata =>{
														let historyData = new sequelize.models.histories({
															userId:users.id,
															module:"referal-points",
															amount:globalVariables.referalBy_points,
															credited:1,
															debited:0,
															description:notificationMessages.referBy_history
														});
														historyData.save().then(()=>{
															let historyData1 = new sequelize.models.histories({
																userId:newUser,
																module:"referal-points",
																amount:globalVariables.referalTo_points,
																credited:1,
																debited:0,
																description:notificationMessages.referTo_history
															});
															historyData1.save().then(()=>{
																let packData = new sequelize.models.packs({
																	masterPackId: 7 ,
																	owned: newUser,
																	openAt: new Date().toJSON().slice(0, 19).replace('T', ' '),
																	opened: 0
																})
																packData.save().then(()=>{
																	let retrunInfo = {status:true, bannedUser:false, users:user, token:token, newUser:true, message:notificationMessages.create_user, referalMessage:notificationMessages.referTo_user};
																	return done(null, retrunInfo);	
																});
															});
														});
													}).catch(error=>{
														console.log("Error while saving referral history"+error)
													});
												}).catch(error=>{
													console.log("Error while updating users"+error)
												})
											}).catch(error=>{
												console.log("Error while finding user"+error)
											})
								    }).catch(error => {
								        console.log("user not created.");
								    });
		        				} else {
		        					var newUser = new sequelize.models.steamUsers(reqdata);
		        					newUser.save().then(user => {
		        						let token =  jwt.sign({ userId: user.id }, config.authTokenSuperSecret, {expiresIn: config.authTokenExpiresIn}); // expires in 24 hours  
		        						let retrunInfo = {status:true, bannedUser:false, users:users, token:token, newUser:true, message:notificationMessages.create_user, referalMessage:notificationMessages.referTo_user};
										return done(null, retrunInfo);
		        					}).catch(error => {
								        console.log("user not created." + error);
								    });
		        				}
		        			})
	        			})
	        		} else {
	        			var newUser = new sequelize.models.steamUsers(reqdata);
						newUser.save().then(users => { 
					        let token =  jwt.sign({ userId: users.id }, config.authTokenSuperSecret, {expiresIn: config.authTokenExpiresIn}); // expires in 24 hours  
				           	let retrunInfo = { users:users, bannedUser:false, token:token, newUser:true, message:notificationMessages.create_user};
							return done(null, retrunInfo);
					    }).catch(error => {
					        console.log("User not created." + error);
					    });
	        		}
	        	}								
    		})
	    });
	})
);

function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 8; i++){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

router.get('/auth/steam', passport.authenticate('steam'));
router.get('/ref/:code',(req,res,next)=>{
	code = req.params.code;
	userId = req.userId;
	next();
}, passport.authenticate('steam'));
module.exports = router;