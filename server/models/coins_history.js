module.exports = function(sequelize, DataTypes){

	var coinsHistory =  sequelize.define('coinsHistory', {
					userId: {
						type: DataTypes.INTEGER
					},
					date: {
						type: DataTypes.DATE
					},
					amount: {
						type: DataTypes.FLOAT
					},
					balance: {
						type: DataTypes.FLOAT
					},
					description: {
						type: DataTypes.STRING
					}
				});

	coinsHistory.sync().then(() => {
	  	coinsHistory.create;
	});

	return coinsHistory;
}