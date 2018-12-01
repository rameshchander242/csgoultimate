module.exports = function(sequelize, DataTypes){

	var pages = sequelize.define('pages', {
					label: {
						type: DataTypes.STRING
					},description: {
						type: DataTypes.TEXT
					},status: {
						type: DataTypes.INTEGER
					},
					slug: {
						type: DataTypes.STRING
					},
					comingSoon: {
						type: DataTypes.BOOLEAN
					},
					comingDate: {
						type: DataTypes.DATE
					},
					icon: {
						type: DataTypes.STRING
					}
				});

	pages.sync().then(() => {
	  	pages.create;
	});

	return pages;
} 