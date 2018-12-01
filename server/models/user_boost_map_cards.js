module.exports = function(sequelize, DataTypes){

	var userBoostMapCards = sequelize.define('userBoostMapCards', {
					receivedAt: {
						type: DataTypes.DATE
					},userId: {
						type: DataTypes.INTEGER
					},boostMapCardId: {
						type: DataTypes.INTEGER
					},packId: {
						type: DataTypes.INTEGER
					},
					marketStatus: {
						type: DataTypes.BOOLEAN
					}
				});

	userBoostMapCards.sync().then(() => {
	  	userBoostMapCards.create;
	});

	return userBoostMapCards;
} 