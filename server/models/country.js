module.exports = function(sequelize, DataTypes){

	var country =  sequelize.define('country', {
					countryName: {
						type: DataTypes.STRING
					},
					imageUrl: {
						type: DataTypes.STRING
					}
				});

	country.sync().then(() => {
	  	country.create;
	});

	return country;
}