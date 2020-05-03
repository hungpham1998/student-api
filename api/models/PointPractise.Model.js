var Sequelize = require('Sequelize');
var sequelize = require('../common/connect');
var Student = require('./Student.Model');
var Year = require('./Year.Model');

var PointPractise = sequelize.define('pointpractise', {
    year_id: {
        type: Sequelize.BIGINT,
        references: {
            model: Year,
            key: 'id'
        },
    },
    student_id: {
        type: Sequelize.BIGINT,
        references: {
            model: Student,
            key: 'id'
        },
    },
    practise: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    underscored: true,
    timestamps: false,
    createAt: false,
    paranoid: true
});

module.exports = PointPractise
