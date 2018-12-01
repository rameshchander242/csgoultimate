module.exports = function(sequelize, DataTypes){

	var cardTypes = sequelize.define('cardTypes', {
					label: {
						type: DataTypes.STRING
					}
				});

	cardTypes.sync().then(() => {
	  	cardTypes.create;
	});

	return cardTypes;
}