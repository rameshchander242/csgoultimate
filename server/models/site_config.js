module.exports = function(sequelize, DataTypes){

	var siteConfigurations =  sequelize.define('siteConfigurations', {
		active: {
			type: DataTypes.BOOLEAN
		},site_key: {
			type: DataTypes.STRING
		},site_value: {
			type: DataTypes.STRING
		},
	});

	siteConfigurations.sync().then(() => {
	  	siteConfigurations.create;
	});

	return siteConfigurations;
}