module.exports = function(sequelize, DataTypes){

	var roles = sequelize.define('roles', {
					label: {
						type: DataTypes.STRING
					},shortName: {
						type: DataTypes.STRING
					}
				});

	roles.sync().then(() => {
	  	roles.create;
	});

	return roles;
}