var Sequelize = require('Sequelize');
var sequelize = require('../unitl/configdb');

var Subject = sequelize.define('subject', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    subject_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    credit_number: {
        type: Sequelize.STRING,
    }
}, {
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
});

module.exports = Subject
