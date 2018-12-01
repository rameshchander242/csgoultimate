module.exports = function(sequelize, DataTypes){

	var playerCards =  sequelize.define('playerCards', {
					cardTypeId: {
						type: DataTypes.INTEGER
					},
					playerId: {
						type: DataTypes.INTEGER
					},
					isSpecial: {
						type: DataTypes.STRING
					},
					bottomLogoUrl: {
						type: DataTypes.STRING
					},
					roleID: {
						type: DataTypes.INTEGER
					},
					rarityLevelId: {
						type: DataTypes.INTEGER
					},
					backgroundUrl: {
						type: DataTypes.STRING
					},
					bottomTooltip: {
						type: DataTypes.STRING
					},
					overallScore: {
						type: DataTypes.STRING
					},
					rifleScore: {
						type: DataTypes.STRING
					},
					awpScore: {
						type: DataTypes.STRING
					},
					clutchScore: {
						type: DataTypes.STRING
					},
					entryScore: {
						type: DataTypes.STRING
					},
					pistolScore: {
						type: DataTypes.STRING
					},
					iqScore: {
						type: DataTypes.STRING
					},
				});

	playerCards.sync().then(() => {
	  	playerCards.create;
	});

	return playerCards;
}