module.exports = function(sequelize, DataTypes){

	var teamBoostCard = sequelize.define('teamBoostCard', {
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
					}
				});

	teamBoostCard.sync().then(() => {
	  	teamBoostCard.create;
	});

	return teamBoostCard;
} 