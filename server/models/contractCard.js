module.exports = function(sequelize, DataTypes){

	var contractCard = sequelize.define('contractCards', {
					image: {
						type: DataTypes.STRING
					},
					rarityLevelId: {
						type: DataTypes.INTEGER
					},
					additionalAmount: {
						type: DataTypes.INTEGER
					}
				});

	contractCard.sync().then(() => {
	  	contractCard.create;
	});

	return contractCard;
} 