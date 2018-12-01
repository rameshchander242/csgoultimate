module.exports = function(sequelize, DataTypes){

	var userBoostRoleCards = sequelize.define('userBoostRoleCards', {
					receivedAt: {
						type: DataTypes.DATE
					},userId: {
						type: DataTypes.INTEGER
					},boostRoleCardId: {
						type: DataTypes.INTEGER
					},packId: {
						type: DataTypes.INTEGER
					},
					marketStatus: {
						type: DataTypes.BOOLEAN
					}
				});

	userBoostRoleCards.sync().then(() => {
	  	userBoostRoleCards.create;
	});

	return userBoostRoleCards;
} 