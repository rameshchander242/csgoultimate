module.exports = function(sequelize, DataTypes){

	var players =  sequelize.define('players', {
					teamId: {
						type: DataTypes.INTEGER
					},
					countryId: {
						type: DataTypes.INTEGER
					},
					pictureUrl: {
						type: DataTypes.STRING
					},
					playerName: {
						type: DataTypes.STRING
					}
				});

	players.sync().then(() => {
	  	players.create;
	});

	return players;
}