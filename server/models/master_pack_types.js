module.exports = function(sequelize, DataTypes){

	var masterPackTypes =  sequelize.define('masterPackTypes', {
					label: {
						type: DataTypes.STRING
					}, percentage: {
						type: DataTypes.FLOAT
					}, 
				});


	masterPackTypes.sync().then(() => {
	  	masterPackTypes.create;
	});

	return masterPackTypes;
}