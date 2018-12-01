module.exports = function(sequelize, DataTypes){

	var steamUsers = sequelize.define('steamUsers', {
	    steamId: {
	        type: DataTypes.BIGINT
	    },
	    displayName: {
	        type: DataTypes.STRING
	    },
	    profileUrl: {
	        type: DataTypes.STRING
	    },
	    avatar: {
	        type: DataTypes.STRING
	    },
	    pointsBalance: {
	        type: DataTypes.FLOAT
	    },
	    coinsBalance: {
	        type: DataTypes.FLOAT
	    },
	    customEmail: {
	        type: DataTypes.STRING
	    },
	    referalCode:{
	    	type: DataTypes.STRING
	    },
	    banned:{
	    	type: DataTypes.BOOLEAN
	    },
	    tos:{
	    	type: DataTypes.BOOLEAN
	    },
	    userTypeId:{
	    	type: DataTypes.STRING	
	    }
	});
	
	steamUsers.sync().then(() => {
	    steamUsers.create;
	}); 

	return steamUsers;
} 