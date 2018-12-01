module.exports = function(sequelize, DataTypes){

	var switchMapCards =  sequelize.define('switchMapCards', {
					cardTypeId: {
						type: DataTypes.INTEGER
					},
					rarityLevelId: {
						type: DataTypes.INTEGER
					},
					image: {
						type: DataTypes.STRING
					},
					fromMapId: {
						type: DataTypes.INTEGER
					},
					toMapId: {
						type: DataTypes.INTEGER
					}
				});

	switchMapCards.sync().then(() => {
	  	switchMapCards.create;
	});

	return switchMapCards	;
}