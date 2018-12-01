const router = require('express').Router();

const Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = new Sequelize(config.dbConfig.database, config.dbConfig.user, config.dbConfig.password, {
    host: config.dbConfig.server,
    dialect: 'mssql',
    dialectOptions: {
      encrypt: true
    },
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
    },
    operatorsAliases: false,
});

var User = sequelize.define('user', {
    steamId: {
        type: Sequelize.BIGINT
    },
    displayName: {
        type: Sequelize.STRING
    },
    profileUrl: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    },
    pointsBalance: {
        type: Sequelize.FLOAT
    },
    coinsBalance: {
        type: Sequelize.FLOAT
    },
    customEmail: {
        type: Sequelize.STRING
    }
});
User.sync().then(() => {
    User.create;
});

// // Get All my packs
router.get('/users', function (req, res) { 

    User.findAll().then(users => {
      if(users.length > 0){
        res.send({status:true, data:users});  
      } else {
        res.send({status:false, message:"No user found !!"});
      }
    })
})

router.post('/users', function (req, res) { 

    var newUser = new User({
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
})
module.exports = router;