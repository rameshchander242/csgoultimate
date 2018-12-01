module.exports = function(sequelize, DataTypes){

	var userPlayerCards =  sequelize.define('userPlayerCards', {
					receivedAt: {
						type: DataTypes.DATE
					},
					userId: {
						type: DataTypes.INTEGER
					},
					playerCardId: {
						type: DataTypes.INTEGER
					},
					packId: {
						type: DataTypes.INTEGER
					},
					formLevel: {
						type: DataTypes.INTEGER
					},
					favouriteMapId: {
						type: DataTypes.INTEGER
					},
					condition: {
						type: DataTypes.FLOAT
					},
					marketStatus: {
						type: DataTypes.BOOLEAN
					}
				});

	userPlayerCards.sync().then(() => {
	  	userPlayerCards.create;
	});

	return userPlayerCards;
}