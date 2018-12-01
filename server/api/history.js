const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op
var config = require('../config.js');
var sequelize = require('../db.js');
router.get('/history', function (req, res) { 
	let histories = {};
	sequelize.models.histories.findAll({where:{userId:req.userId, module:{[Op.like]: '%-coins'}}, order: [ [ 'createdAt', 'DESC' ]]}).then(coinsBalance => {
		histories["coinsHistory"] = coinsBalance;
		sequelize.models.histories.findAll({where:{userId:req.userId, module:{[Op.like]: '%-points'}}, order: [ [ 'createdAt', 'DESC' ]]}).then(pointsBalance => {
			histories["pointsHistory"] = pointsBalance
			sequelize.models.packs.findAll({where:{owned:req.userId}}).then(totalPacks => {
				histories["totalPacks"] = totalPacks.length
				sequelize.models.packs.findAll({where:{opened:1, owned:req.userId}}).then(openedPacks => {
					histories["openedPacks"] = openedPacks.length
					sequelize.models.histories.findAll({where:{userId:req.userId, module:{[Op.like]: '%-sold-%'}}}).then(soldItems => {
						histories["soldItems"] = soldItems.length;
						sequelize.query("select ( select count(*) from userPlayerCards )+( select count(*) from userCoachCards )+( select count(*) from userFitnessCards )+ ( select count(*) from userContractCards )+ ( select count(*) from userSwitchRoleCards ) + ( select count(*) from userSwitchMapCards ) + ( select count(*) from userBoostRoleCards ) + ( select count(*) from userBoostMapCards ) + ( select count(*) from userBoostTeamCards ) as total_rows").then(total_rows=>{
							histories["totalItems"] = total_rows[0][0].total_rows;
							res.send({status:true, data:histories, message:""});
						});
					});
			    });
		    });
	    });
    });
});

router.get('/notifications', function (req, res) { 
	let histories = {};
	sequelize.models.histories.findAll({where:{userId:req.userId, status: 0}, order: [ [ 'createdAt', 'DESC' ]]}).then(notifications => {
		res.send({status:true, data:notifications, message:""});
  });
});

router.post('/notifications-delete', function (req, res){
	sequelize.models.histories.update({status:1},{where:{userId:req.userId, id:req.body.id}}).then(userPlayerCard=>{
		res.send({ status:true, message: notificationMessages.delete_history });
	});
});
router.post('/notifications-delete-all', function (req, res){
	sequelize.models.histories.update({status:1},{where:{userId:req.userId}}).then(userPlayerCard=>{
		res.send({ status:true, message: notificationMessages.delete_history });
	});
});

module.exports = router; 