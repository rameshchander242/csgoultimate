module.exports = function(sequelize, DataTypes){

	var userTypes = sequelize.define('userTypes', {
	    label: {
	        type: DataTypes.STRING
	    }
	});
	
	userTypes.sync().then(() => {
	    userTypes.create;
	}); 

	return userTypes;
} 