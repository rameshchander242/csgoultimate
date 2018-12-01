module.exports = function(sequelize, DataTypes){

	var marketPlaces =  sequelize.define('marketPlaces', {
		userId: {
			type: DataTypes.INTEGER
		},userCardId: {
			type: DataTypes.INTEGER
		},cardType: {
			type: DataTypes.STRING
		},marketValue: {
			type: DataTypes.FLOAT
		},purchased: {
			type: DataTypes.BOOLEAN
		},boughtUser: {
			type: DataTypes.INTEGER
		}
	});

	marketPlaces.sync().then(() => {
	  	marketPlaces.create;
	});

	return marketPlaces;
}