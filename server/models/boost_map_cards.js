module.exports = function(sequelize, DataTypes){

	var boostMapCards = sequelize.define('boostMapCards', {
					cardTypeId: {
						type: DataTypes.INTEGER
					},rarityLevelId: {
						type: DataTypes.INTEGER
					},image: {
						type: DataTypes.STRING
					},mapId: {
						type: DataTypes.INTEGER
					},boostPct: {
						type: DataTypes.INTEGER
					}
				});

	boostMapCards.sync().then(() => {
	  	boostMapCards.create;
	});

	return boostMapCards;
} 