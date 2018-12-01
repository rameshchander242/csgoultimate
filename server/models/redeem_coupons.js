module.exports = function(sequelize, DataTypes){

	var coupons = sequelize.define('coupons', {
					title: {
						type: DataTypes.STRING
					},code: {
						type: DataTypes.STRING
					},masterPackId: {
						type: DataTypes.INTEGER
					},balanceTypeId: {
						type: DataTypes.INTEGER
					},value: {
						type: DataTypes.INTEGER
					},maxUses: {
						type: DataTypes.INTEGER
					},uses: {
						type: DataTypes.INTEGER
					}
				});

	coupons.sync().then(() => {
	  	coupons.create;
	});

	return coupons; 
}