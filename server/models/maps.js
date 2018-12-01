module.exports = function(sequelize, DataTypes){

	var maps =  sequelize.define('maps', {
					label: {
						type: DataTypes.STRING
					}
				});

	maps.sync().then(() => {
	  	maps.create;
	});

	return maps;
}