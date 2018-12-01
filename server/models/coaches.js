module.exports = function(sequelize, DataTypes){

	var coaches =  sequelize.define('coaches', {
		teamId: {
			type: DataTypes.INTEGER
		},
		countryId: {
			type: DataTypes.INTEGER
		},
		pictureUrl: {
			type: DataTypes.STRING
		},
		coachName: {
			type: DataTypes.STRING
		}
	});

	coaches.sync().then(() => {
	  	coaches.create;
	});

	return coaches;
}