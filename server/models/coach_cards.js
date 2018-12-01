module.exports = function(sequelize, DataTypes){

	var coachCards =  sequelize.define('coachCards', {
					cardTypeId: {
						type: DataTypes.INTEGER
					},
					coachId: {
						type: DataTypes.INTEGER
					},
					rarityLevelId: {
						type: DataTypes.INTEGER
					},
					boostTypeId: {
						type: DataTypes.INTEGER
					},
					boostRoleId: {
						type: DataTypes.INTEGER
					},
					boostMapId: {
						type: DataTypes.INTEGER
					},
					boostPct: {
						type: DataTypes.INTEGER
					},
					backgroundUrl: {
						type: DataTypes.STRING
					},
					overallScore: {
						type: DataTypes.INTEGER
					}
				});

	coachCards.sync().then(() => {
	  	coachCards.create;
	});

	return coachCards;
}