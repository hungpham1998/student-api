var Sequelize = require('Sequelize');
var sequelize = require('../unitl/configdb');

var Class = sequelize.define('class', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    class_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    specialized_id: {
        type: Sequelize.BIGINT,
        references: {
            model: Specialized,
            key: 'id'
        },
    },
    number_people: {
        type: Sequelize.BIGINT,
        allowNull: false,
    }
}, {
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
});

module.exports = Class
