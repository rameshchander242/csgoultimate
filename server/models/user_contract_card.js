module.exports = function(sequelize, DataTypes){

	var userContractCard = sequelize.define('userContractCards', {
					receivedAt: {
						type: DataTypes.DATE
					},userId: {
						type: DataTypes.INTEGER
					},image: {
						type: DataTypes.STRING
					},contractCardId: {
						type: DataTypes.INTEGER
					},packId: {
						type: DataTypes.INTEGER
					},
					marketStatus: {
						type: DataTypes.BOOLEAN
					}
				});

	userContractCard.sync().then(() => {
	  	userContractCard.create;
	});

	return userContractCard;
} 