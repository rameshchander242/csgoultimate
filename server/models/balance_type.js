module.exports = function(sequelize, DataTypes){

	var balanceTypes = sequelize.define('balanceTypes', {
					label: {
						type: DataTypes.STRING
					}
				});

	balanceTypes.sync().then(() => {
	  	balanceTypes.create;
	});

	return balanceTypes;
} 