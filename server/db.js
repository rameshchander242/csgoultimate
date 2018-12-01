const Sequelize = require('sequelize');
var config = require('./config.js');
var path = require('path');
var fs = require('fs');
var basename  = path.basename(__filename);

/* Database connection code */
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
    operatorsAliases: false
});
sequelize.authenticate();

var models = new Array();
models["userTypes"] = 'models/user_types';
models["steamUsers"] = 'models/steam_users'; 
models["masterPacks"] = 'models/master_packs'; 
models["cardTypes"] = 'models/card_types'; 
models["packs"] = 'models/my_packs'; 
models["coinsHistory"] = 'models/coins_history'; 
models["players"] = 'models/players'; 
models["rarityLevels"] = 'models/rarity_levels'; 
models["playerCards"] = 'models/player_cards'; 
models["userPlayerCards"] = 'models/user_player_cards';  
models["roles"] = 'models/roles'; 
models["teams"] = 'models/teams'; 
models["country"] = 'models/country'; 
models["maps"] = 'models/maps'; 
models["coupons"] = 'models/redeem_coupons'; 
models["balanceTypes"] = 'models/balance_type';  
models["couponsHistory"] = 'models/coupons_history';  
models["notifications"] = 'models/notifications';  
models["coachCards"] = 'models/coach_cards';  
models["coaches"] = 'models/coaches';  
models["userCoachCards"] = 'models/userCoachCards';  
models["userFitnessCards"] = 'models/user_fitness_cards';  
models["userSwitchMapCards"] = 'models/user_switch_map_cards';  
models["userSwitchRoleCards"] = 'models/user_switch_role_cards';  
models["fitnessCards"] = 'models/fitness_cards';  
models["switchMapCards"] = 'models/switch_map_cards';  
models["switchRoleCards"] = 'models/switch_role_cards';  
models["masterPackTypes"] = 'models/master_pack_types';
models["packTabs"] = 'models/pack_tabs'; 
models["boostTypes"] = 'models/boost_types'; 
models["boostMapCards"] = 'models/boost_map_cards'; 
models["boostRoleCards"] = 'models/boost_role_cards'; 
models["boostTeamCards"] = 'models/boost_team_cards'; 
models["userBoostTeamCards"] = 'models/user_team_boost_card'; 
models["contractCards"] = 'models/contractCard'; 
models["userContractCards"] = 'models/user_contract_card'; 
models["userBoostMapCards"] = 'models/user_boost_map_cards'; 
models["userBoostRoleCards"] = 'models/user_boost_role_cards'; 
models["referralHistories"] = 'models/referral_history'; 
models["pages"] = 'models/pages';
models["histories"] = 'models/histories';
models["siteConfigurations"] = 'models/site_config';
models["marketPlaces"] = 'models/market_place';
models["comingSoonPages"] = 'models/coming_soon_pages'; 
models["notificationMessages"] = 'models/notificationMessages';  
models["rewards"] = 'models/rewards';  

for (var key in models){
    exports[models[key]] = sequelize.import( key, require('./'+models[key]) );
} 

sequelize.models.coupons.belongsTo(sequelize.models.masterPacks, { as:"masterPackData",foreignKey: 'masterPackId'});
sequelize.models.coupons.belongsTo(sequelize.models.balanceTypes, { as:"balanceTypeData",foreignKey: 'balanceTypeId'});

sequelize.models.userPlayerCards.belongsTo(sequelize.models.packs, { as:"packData",foreignKey: 'packId'});
sequelize.models.userPlayerCards.belongsTo(sequelize.models.steamUsers, { as:"userData",foreignKey: 'userId'});
sequelize.models.userPlayerCards.belongsTo(sequelize.models.maps, { as:"mapData",foreignKey: 'favouriteMapId'});

sequelize.models.marketPlaces.belongsTo(sequelize.models.userPlayerCards, { as:"userPlayerCardData",foreignKey: 'userCardId'});
sequelize.models.marketPlaces.belongsTo(sequelize.models.userCoachCards, { as:"userCoachCardData",foreignKey: 'userCardId'});
sequelize.models.marketPlaces.belongsTo(sequelize.models.userFitnessCards, { as:"userFitnessCardData",foreignKey: 'userCardId'});
sequelize.models.marketPlaces.belongsTo(sequelize.models.userContractCards, { as:"userContractCardData",foreignKey: 'userCardId'});
sequelize.models.marketPlaces.belongsTo(sequelize.models.userSwitchMapCards, { as:"userSwitchMapCardData",foreignKey: 'userCardId'});
sequelize.models.marketPlaces.belongsTo(sequelize.models.userSwitchRoleCards, { as:"userSwitchRoleCardData",foreignKey: 'userCardId'});
sequelize.models.marketPlaces.belongsTo(sequelize.models.userBoostMapCards, { as:"userBoostMapCardData",foreignKey: 'userCardId'});
sequelize.models.marketPlaces.belongsTo(sequelize.models.userBoostRoleCards, { as:"userBoostRoleCardData",foreignKey: 'userCardId'});
sequelize.models.marketPlaces.belongsTo(sequelize.models.userBoostTeamCards, { as:"userBoostTeamCardData",foreignKey: 'userCardId'});


sequelize.models.userPlayerCards.belongsTo(sequelize.models.playerCards, { as:"playerCardData",foreignKey: 'playerCardId'});

sequelize.models.userCoachCards.belongsTo(sequelize.models.coachCards, {as:"coachCardData",foreignKey: 'coachCardId'});
sequelize.models.userCoachCards.belongsTo(sequelize.models.packs, {as:"packData",foreignKey: 'packId'});

sequelize.models.masterPacks.belongsTo(sequelize.models.cardTypes, {as:"cardTypeData",foreignKey: 'cardTypeId'});
sequelize.models.masterPacks.belongsTo(sequelize.models.packTabs, {as:"packTabData",foreignKey: 'packTabId'});

sequelize.models.packs.belongsTo(sequelize.models.masterPacks, {as:"masterPackData",foreignKey: 'masterPackId'});

sequelize.models.playerCards.belongsTo(sequelize.models.players, {as:"playersData",foreignKey: 'playerId'});
sequelize.models.playerCards.belongsTo(sequelize.models.roles, {as:"rolesData",foreignKey: 'roleId'});
sequelize.models.playerCards.belongsTo(sequelize.models.cardTypes, {as:"cardTypesData",foreignKey: 'cardTypeId'});
sequelize.models.playerCards.belongsTo(sequelize.models.rarityLevels, {as:"rarityLevelsData",foreignKey: 'rarityLevelId'});


sequelize.models.coachCards.belongsTo(sequelize.models.boostTypes, {as:"boostTypeData",foreignKey: 'boostTypeId'});
sequelize.models.coachCards.belongsTo(sequelize.models.boostRoleCards, {as:"boostRoleCardsData",foreignKey: 'boostRoleId'});
sequelize.models.coachCards.belongsTo(sequelize.models.boostMapCards, {as:"boostMapCardsData",foreignKey: 'boostMapId'});
sequelize.models.coachCards.belongsTo(sequelize.models.rarityLevels, {as:"rarityLevelsData",foreignKey: 'rarityLevelId'});
sequelize.models.coachCards.belongsTo(sequelize.models.cardTypes, {as:"cardTypesData",foreignKey: 'cardTypeId'});
sequelize.models.coachCards.belongsTo(sequelize.models.coaches, {as:"coachData",foreignKey: 'coachId'});

sequelize.models.contractCards.belongsTo(sequelize.models.rarityLevels, {as:"rarityLevelsData",foreignKey: 'rarityLevelId'});

sequelize.models.players.belongsTo(sequelize.models.teams, {as:"teamData",foreignKey: 'teamId'});
sequelize.models.players.belongsTo(sequelize.models.country, {as:"countryData",foreignKey: 'countryId'});

sequelize.models.coaches.belongsTo(sequelize.models.teams, {as:"teamData",foreignKey: 'teamId'});
sequelize.models.coaches.belongsTo(sequelize.models.country, {as:"countryData",foreignKey: 'countryId'});

sequelize.models.switchMapCards.belongsTo(sequelize.models.maps, {as:"toMapData",foreignKey: 'toMapId'});
sequelize.models.switchMapCards.belongsTo(sequelize.models.maps, {as:"fromMapData",foreignKey: 'fromMapId'});
sequelize.models.switchMapCards.belongsTo(sequelize.models.cardTypes, {as:"cardTypesData",foreignKey: 'cardTypeId'});
sequelize.models.switchMapCards.belongsTo(sequelize.models.rarityLevels, {as:"rarityLevelsData",foreignKey: 'rarityLevelId'});

sequelize.models.fitnessCards.belongsTo(sequelize.models.cardTypes, {as:"cardTypesData",foreignKey: 'cardTypeId'});
sequelize.models.fitnessCards.belongsTo(sequelize.models.rarityLevels, {as:"rarityLevelsData",foreignKey: 'rarityLevelId'});

sequelize.models.boostRoleCards.belongsTo(sequelize.models.rarityLevels, {as:"rarityLevelsData",foreignKey: 'rarityLevelId'});
sequelize.models.boostRoleCards.belongsTo(sequelize.models.roles, {as:"rolesData",foreignKey: 'roleId'});
sequelize.models.boostRoleCards.belongsTo(sequelize.models.cardTypes, {as:"cardTypesData",foreignKey: 'cardTypeId'});

sequelize.models.boostTeamCards.belongsTo(sequelize.models.rarityLevels, {as:"rarityLevelsData",foreignKey: 'rarityLevelId'});
sequelize.models.boostTeamCards.belongsTo(sequelize.models.cardTypes, {as:"cardTypesData",foreignKey: 'cardTypeId'});
sequelize.models.boostTeamCards.belongsTo(sequelize.models.teams, {as:"teamData",foreignKey: 'teamId'});

sequelize.models.boostMapCards.belongsTo(sequelize.models.rarityLevels, {as:"rarityLevelsData",foreignKey: 'rarityLevelId'});
sequelize.models.boostMapCards.belongsTo(sequelize.models.maps, {as:"mapsData",foreignKey: 'mapId'});
sequelize.models.boostMapCards.belongsTo(sequelize.models.cardTypes, {as:"cardTypesData",foreignKey: 'cardTypeId'});

sequelize.models.switchRoleCards.belongsTo(sequelize.models.cardTypes, {as:"cardTypesData",foreignKey: 'cardTypeId'});
sequelize.models.switchRoleCards.belongsTo(sequelize.models.rarityLevels, {as:"rarityLevelsData",foreignKey: 'rarityLevelId'});
sequelize.models.switchRoleCards.belongsTo(sequelize.models.roles, {as:"rolesData",foreignKey: 'roleId'});

sequelize.models.userFitnessCards.belongsTo(sequelize.models.fitnessCards, {as:"fitnessCardData",foreignKey: 'fitnessCardId'});
sequelize.models.userFitnessCards.belongsTo(sequelize.models.packs, {as:"packData",foreignKey: 'packId'});

sequelize.models.userSwitchMapCards.belongsTo(sequelize.models.switchMapCards, {as:"switchMapCardData",foreignKey: 'switchMapCardId'});
sequelize.models.userSwitchMapCards.belongsTo(sequelize.models.packs, {as:"packData",foreignKey: 'packId'});

sequelize.models.userContractCards.belongsTo(sequelize.models.contractCards, {as:"contractCardData",foreignKey: 'contractCardId'});
sequelize.models.userContractCards.belongsTo(sequelize.models.packs, {as:"packData",foreignKey: 'packId'});

sequelize.models.userSwitchRoleCards.belongsTo(sequelize.models.switchRoleCards, {as:"switchRoleCardData",foreignKey: 'switchRoleCardId'});
sequelize.models.userSwitchRoleCards.belongsTo(sequelize.models.packs, {as:"packData",foreignKey: 'packId'});

sequelize.models.userBoostRoleCards.belongsTo(sequelize.models.boostRoleCards, {as:"boostRoleCardData",foreignKey: 'boostRoleCardId'});
sequelize.models.userBoostRoleCards.belongsTo(sequelize.models.packs, {as:"packData",foreignKey: 'packId'});

sequelize.models.userBoostTeamCards.belongsTo(sequelize.models.boostTeamCards, {as:"boostTeamCardData",foreignKey: 'teamBoostCardId'});
sequelize.models.userBoostTeamCards.belongsTo(sequelize.models.packs, {as:"packData",foreignKey: 'packId'});

sequelize.models.userBoostMapCards.belongsTo(sequelize.models.boostMapCards, {as:"boostMapCardData",foreignKey: 'boostMapCardId'});
sequelize.models.userBoostMapCards.belongsTo(sequelize.models.packs, {as:"packData",foreignKey: 'packId'});

module.exports = sequelize; 
/* Database connection code  ends */