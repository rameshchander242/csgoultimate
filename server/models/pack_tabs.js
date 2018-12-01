module.exports = function(sequelize, DataTypes){

	var packTabs = sequelize.define('packTabs', {
					label: {
						type: DataTypes.STRING
					}
				});

	packTabs.sync().then(() => {
	  	packTabs.create;
	});

	return packTabs;
}