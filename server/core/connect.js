const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var config = require('../config');

var connect = function()
{
    var sequelize = new Sequelize(config.database, config.user, config.password, {
		host: config.server,
		dialect: 'mssql',
		operatorsAliases: false,
	});
};

module.exports = connect;