module.exports = function(sequelize, DataTypes){

	var userSwitchMapCards =  sequelize.define('userSwitchMapCards', {
					userId: {
						type: DataTypes.INTEGER
					},
					switchMapCardId: {
						type: DataTypes.INTEGER
					},
					packId: {
						type: DataTypes.INTEGER
					},
					receivedAt: {
						type: DataTypes.DATE
					},
					marketStatus: {
						type: DataTypes.BOOLEAN
					}
				});

	userSwitchMapCards.sync().then(() => {
	  	userSwitchMapCards.create;
	});

	return userSwitchMapCards;
}