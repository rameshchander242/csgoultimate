module.exports = function(sequelize, DataTypes){

	var teams =  sequelize.define('teams', {
					teamName: {
						type: DataTypes.STRING
					},
					logoUrl: {
						type: DataTypes.STRING
					}
				});

	teams.sync().then(() => {
	  	teams.create;
	});

	return teams;
}