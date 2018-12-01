module.exports = function(sequelize, DataTypes){

	var comingSoonPages =  sequelize.define('comingSoonPages', {
					label: {
						type: DataTypes.STRING
					},
					slug: {
						type: DataTypes.STRING
					},
					description: {
						type: DataTypes.TEXT
					},
					comingDate: {
						type: DataTypes.DATE
					},
					icon: {
						type: DataTypes.STRING
					}
				});

	comingSoonPages.sync().then(() => {
	  	comingSoonPages.create;
	});

	return comingSoonPages;
}