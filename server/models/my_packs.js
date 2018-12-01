module.exports = function(sequelize, DataTypes){

	var Pack = sequelize.define('packs', {
		masterPackId: {
			type: DataTypes.INTEGER
		},
		owned: {
			type: DataTypes.INTEGER
		},
		opened: {
			type: DataTypes.INTEGER
		},
		openedAt: {
			type: DataTypes.DATE
		},
		receivedAt: {
			type: DataTypes.DATE
		}
	});

	Pack.sync();
	return Pack;
}