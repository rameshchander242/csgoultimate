module.exports = function(sequelize, DataTypes){

	var rarityLevels =  sequelize.define('rarityLevels', {
					level: {
						type: DataTypes.INTEGER
					},
					minRating: {
						type: DataTypes.INTEGER
					},
					maxRating: {
						type: DataTypes.INTEGER
					},
					quickSellValue: {
						type: DataTypes.INTEGER
					},
					rarityValue: {
						type: DataTypes.INTEGER
					}
				});

	rarityLevels.sync().then(() => {
	  	rarityLevels.create;
	});

	return rarityLevels;
}