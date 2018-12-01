module.exports = function(sequelize, DataTypes){

	var notificationMessages =  sequelize.define('notificationMessages', {
		slug: {
			type: DataTypes.STRING
		},
		title: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.STRING
		}
	});

	notificationMessages.sync();
	return notificationMessages;
}