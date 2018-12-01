module.exports = function(sequelize, DataTypes){

	var userFitnessCards =  sequelize.define('userFitnessCards', {
					userId: {
						type: DataTypes.INTEGER
					},
					fitnessCardId: {
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

	userFitnessCards.sync().then(() => {
	  	userFitnessCards.create;
	});

	return userFitnessCards;
}