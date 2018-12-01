module.exports = function(sequelize, DataTypes){

	var masterPacks = sequelize.define('masterPacks', {
					cardTypeId: {
						type: DataTypes.INTEGER
					},
					label: {
						type: DataTypes.STRING
					},
					imageUrl: {
						type: DataTypes.STRING
					},
					packItems: {
						type: DataTypes.STRING
					},
					coinPrice: {
						type: DataTypes.INTEGER
					},
					pointPrice: {
						type: DataTypes.INTEGER
					},
					cardAmount: {
						type: DataTypes.INTEGER
					},
					minimumGoldAmount: {
						type: DataTypes.INTEGER
					},
					minimumPlayerAmount: {
						type: DataTypes.INTEGER
					},packTabid: {
						type: DataTypes.INTEGER
					},
					discount: {
						type: DataTypes.INTEGER
					},
					discountColor: {
						type: DataTypes.STRING
					},
					discountText: {
						type: DataTypes.STRING
					},
					discountActive: {
						type: DataTypes.INTEGER
					},
					active: {
						type: DataTypes.BOOLEAN
					}
				});

	masterPacks.sync().then(() => {
	  	masterPacks.create;
	});

	return masterPacks
}