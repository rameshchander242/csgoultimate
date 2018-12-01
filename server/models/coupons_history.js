module.exports = function(sequelize, DataTypes){

	var couponsHistory =  sequelize.define('couponsHistory', {
					userId: {
						type: DataTypes.INTEGER
					},
					couponId: {
						type: DataTypes.INTEGER
					}
				});

	couponsHistory.sync().then(() => {
	  	couponsHistory.create;
	});

	return couponsHistory;
}