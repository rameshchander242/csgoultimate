module.exports = function(sequelize, DataTypes){

	var boostRoleCards = sequelize.define('boostRoleCards', {
					cardTypeId: {
						type: DataTypes.INTEGER
					},rarityLevelId: {
						type: DataTypes.INTEGER
					},image: {
						type: DataTypes.STRING
					},roleId: {
						type: DataTypes.INTEGER
					},boostPct: {
						type: DataTypes.INTEGER
					}
				});

	boostRoleCards.sync().then(() => {
	  	boostRoleCards.create;
	});

	return boostRoleCards;
}