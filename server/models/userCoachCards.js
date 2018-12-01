module.exports = function(sequelize, DataTypes){

	var userCoachCards =  sequelize.define('userCoachCards', {
		userId: {
			type: DataTypes.INTEGER
		},
		coachCardId: {
			type: DataTypes.INTEGER
		},
		packId: {
			type: DataTypes.INTEGER
		},
		formLevel: {
			type: DataTypes.INTEGER
		},
		condition: {
			type: DataTypes.INTEGER
		},
		receivedAt: {
			type: DataTypes.DATE
		},
		marketStatus: {
			type: DataTypes.BOOLEAN
		}
	});

	userCoachCards.sync().then(() => {
	  	userCoachCards.create;
	});

	return userCoachCards;
}