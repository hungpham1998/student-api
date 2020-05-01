var Sequelize = require('sequelize');
var sequelize = require('../common/connect');
var Student = require('./Student.Model');
var Subject = require('../models/Subject.Model');
var Year = require('../models/Year.Model');

var PointStudent = sequelize.define('pointstudent',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        student_id: {
            type: Sequelize.BIGINT,
            references: {
                model: Student,
                key: 'id'
            },
            
        },
        subject_id: {
            type: Sequelize.BIGINT,
            references: {
                model: Subject,
                key: 'id'
            },
            
        },
        year_id: {
            type: Sequelize.BIGINT,
            references: {
                model: Year,
                key: 'id'
            },
            
        },
        point_cc: {
            type: Sequelize.BIGINT,
        },
        point_kt1: {
            type: Sequelize.BIGINT,
        },
        point_kt2: {
            type: Sequelize.BIGINT,
        },
        point_gk: {
            type: Sequelize.BIGINT,
        },
        point_t: {
            type: Sequelize.BIGINT,
        },
    },
    {
        underscored: true,
        timestamps: false,
        createAt: false,
        paranoid: true
    }
);

module.exports = PointStudent
