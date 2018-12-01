module.exports = function(sequelize, DataTypes){

	var switchRoleCards =  sequelize.define('switchRoleCards', {
					cardTypeId: {
						type: DataTypes.INTEGER
					},
					rarityLevelId: {
						type: DataTypes.INTEGER
					},
					image: {
						type: DataTypes.STRING
					}
				});

	switchRoleCards.sync().then(() => {
	  	switchRoleCards.create;
	});

	return switchRoleCards	;
}