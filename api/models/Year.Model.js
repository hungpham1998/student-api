var Sequelize = require('Sequelize');
var sequelize = require('../unitl/configdb');

var Year = sequelize.define('year', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    learnyear: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
});

module.exports = Year
