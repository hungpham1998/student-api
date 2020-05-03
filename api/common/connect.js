const Sequelize = require('sequelize');
const configdb = require('../unitl/configdb');



const sequelize = new Sequelize(
	configdb.mysql.database,
	configdb.mysql.username,
	configdb.mysql.password, {
		host: configdb.mysql.host,
		dialect: 'mysql'
	}
);

module.exports = sequelize;
