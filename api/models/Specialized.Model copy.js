var Sequelize = require('Sequelize');
var sequelize = require('../unitl/configdb');

var Specialized = sequelize.define('specialized', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    specialized_name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
});

module.exports = Specialized
