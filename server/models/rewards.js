module.exports = function(sequelize, DataTypes){

	var rewards = sequelize.define('rewards', {
					label: {
						type: DataTypes.STRING
					},pointsBalance: {
						type: DataTypes.FLOAT
					},coinsBalance: {
						type: DataTypes.FLOAT
					},pack: {
						type: DataTypes.FLOAT
					},slug: {
						type: DataTypes.STRING
					},active: {
						type: DataTypes.BOOLEAN
					}
				});

	rewards.sync().then(() => {
	  	rewards.create;
	});

	return rewards;
} 