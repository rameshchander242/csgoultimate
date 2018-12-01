module.exports = function(sequelize, DataTypes){

	var userSwitchRoleCards =  sequelize.define('userSwitchRoleCards', {
					userId: {
						type: DataTypes.INTEGER
					},
					switchRoleCardId: {
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

	userSwitchRoleCards.sync().then(() => {
	  	userSwitchRoleCards.create;
	});

	return userSwitchRoleCards;
}