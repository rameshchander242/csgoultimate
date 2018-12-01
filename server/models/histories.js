module.exports = function(sequelize, DataTypes){

	var histories = sequelize.define('histories', {
					userId: {
						type: DataTypes.BIGINT
					},
					module: {
						type: DataTypes.STRING
					},
					amount: {
						type: DataTypes.INTEGER
					},
					credited: {
						type: DataTypes.INTEGER
					},
					debited: {
						type: DataTypes.INTEGER
					},
					description: {
						type: DataTypes.TEXT
					},
					status: {
						type: DataTypes.BOOLEAN
					}
				});

	histories.sync().then(() => {
	  	histories.create;
	});

	return histories
}