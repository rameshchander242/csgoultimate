module.exports = function(sequelize, DataTypes){

	var boostMapCards = sequelize.define('boostTeamCards', {
					cardTypeId: {
						type: DataTypes.INTEGER
					},rarityLevelId: {
						type: DataTypes.INTEGER
					},image: {
						type: DataTypes.STRING
					},boostPct1: {
						type: DataTypes.INTEGER
					},boostPct2: {
						type: DataTypes.INTEGER
					},boostPct3: {
						type: DataTypes.INTEGER
					},boostTypeId1: {
						type: DataTypes.INTEGER
					},boostTypeId2: {
						type: DataTypes.INTEGER
					},boostTypeId3: {
						type: DataTypes.INTEGER
					},boostTypeValue1: {
						type: DataTypes.INTEGER
					},boostTypeValue2: {
						type: DataTypes.INTEGER
					},boostTypeValue3: {
						type: DataTypes.INTEGER
					},teamId: {
						type: DataTypes.INTEGER
					}
				});

	boostMapCards.sync().then(() => {
	  	boostMapCards.create;
	});

	return boostMapCards;
} 