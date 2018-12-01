module.exports = function(sequelize, DataTypes){

	var userBoostTeamCards = sequelize.define('userBoostTeamCards', {
					receivedAt: {
						type: DataTypes.DATE
					},userId: {
						type: DataTypes.INTEGER
					},teamBoostCardId: {
						type: DataTypes.INTEGER
					},packId: {
						type: DataTypes.INTEGER
					},
					marketStatus: {
						type: DataTypes.BOOLEAN
					}
				});

	userBoostTeamCards.sync().then(() => {
	  	userBoostTeamCards.create;
	});

	return userBoostTeamCards;
} 