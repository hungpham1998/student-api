var Sequelize = require('sequelize');
var configdb = require('../unitl/configdb');


var sequelize = new Sequelize(
	configdb.mysql.database,
	configdb.mysql.username,
	configdb.mysql.password, {
		host: configdb.mysql.host,
		dialect: 'mysql'
	}
);

module.exports = sequelize;
