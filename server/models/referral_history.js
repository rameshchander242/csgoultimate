module.exports = function(sequelize, DataTypes){

	var referralHistory =  sequelize.define('referralHistories', {
					referralUser: {
						type: DataTypes.STRING
					},
					referedUser: {
						type: DataTypes.STRING
					},
					code:{
						type:DataTypes.STRING
					}
				});

	referralHistory.sync().then(() => {
	  	referralHistory.create;
	});

	return referralHistory;
}