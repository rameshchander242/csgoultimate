module.exports = function(sequelize, DataTypes){

	var fitnessCards =  sequelize.define('fitnessCards', {
		cardTypeId: {
			type: DataTypes.INTEGER
		},
		rarityLevelId: {
			type: DataTypes.INTEGER
		},
		image: {
			type: DataTypes.STRING
		},
		additionAmount: {
			type: DataTypes.INTEGER
		}
	});

	fitnessCards.sync().then(() => {
	  	fitnessCards.create;
	});

	return fitnessCards;
}