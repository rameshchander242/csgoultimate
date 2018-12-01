module.exports = function(sequelize, DataTypes){

	var notifications =  sequelize.define('notifications', {
		label: {
			type: DataTypes.STRING
		},
		message: {
			type: DataTypes.STRING
		}
	});

	notifications.sync();
	return notifications;
}