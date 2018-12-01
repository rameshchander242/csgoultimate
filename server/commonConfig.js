const Sequelize = require('sequelize');
var sequelize = require('./db.js');
var itemsDetails = {
  'player':{
    name:"players", 
    userCard:"userPlayerCards",
    card:"playerCards",
    data:"playersData",
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
  'coach':{
    name:"coaches", 
    userCard:"userCoachCards",
    card:"coachCards",
    data:"coachData",
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
  'fitness':{
    name:"fitness",
    userCard:"userFitnessCards",
    card:"fitnessCards",
    data:"fitnessData",
    include:[
      { model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
      { model: sequelize.models.cardTypes, as:"cardTypesData" }
    ]
  },
  'contract':{
    name:"contract", 
    userCard:"userContractCards",
    card:"contractCards",
    data:"contractData",
    include:[
      { model:sequelize.models.rarityLevels, as:"rarityLevelsData" }
    ]
  }, 
  'switchMap':{
    name:"switchMapCards",
    userCard:"userSwitchMapCards", 
    card:"switchMapCards",
    data:"switchMapCardData",
    include:[
      { model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
      { model:sequelize.models.maps, as:"toMapData" },
      // { model:sequelize.models.maps, as:"fromMapData" },
      { model:sequelize.models.cardTypes, as:"cardTypesData"},
    ]
  }, 
  'switchRole':{
    name:"switchRoleCards", 
    userCard:"userSwitchRoleCards",
    card:"switchRoleCards",
    data:"switchRoleCardData",
    include:[
      { model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
      { model:sequelize.models.roles, as:"rolesData" },
      { model:sequelize.models.cardTypes, as:"cardTypesData"},
    ]
  }, 
  'boostRole':{
    name:"boostRoleCards", 
    userCard:"userBoostRoleCards",
    card:"boostRoleCards",
    data:"boostRoleCardData",
    include:[
      { model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
      { model:sequelize.models.roles, as:"rolesData" },
      { model:sequelize.models.cardTypes, as:"cardTypesData"},
    ]
  }, 
  'boostMap':{
    name:"boostMapCards",
    userCard:"userBoostMapCards", 
    card:"boostMapCards",
    data:"boostMapCardData",
    include:[
      { model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
      { model:sequelize.models.maps, as:"mapsData" },
      { model:sequelize.models.cardTypes, as:"cardTypesData"},
    ]
  }, 
  'boostTeam':{
    name:"boostTeamCards", 
    userCard:"userBoostTeamCards",
    card:"boostTeamCards",
    data:"boostTeamCardData",
    include:[
      { model:sequelize.models.rarityLevels, as:"rarityLevelsData" },
      { model:sequelize.models.cardTypes, as:"cardTypesData"},
      { model:sequelize.models.teams, as:"teamData" }
    ]
  }, 
};
module.exports = itemsDetails; 