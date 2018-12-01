module.exports = function(sequelize, DataTypes){

	var boostTypes = sequelize.define('boostTypes', {
					label: {
						type: DataTypes.STRING
					}
				});

	boostTypes.sync().then(() => {
	  	boostTypes.create;
	});

	return boostTypes;
} 