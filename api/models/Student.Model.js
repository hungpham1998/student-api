var Sequelize = require('sequelize')

var sequelize = require('../until/db')

var Student = sequelize.define('student',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        frist_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        student_photo: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        brithday: {
            type: Sequelize.DATE
        },
        class_id: {
            type: Sequelize.BIGINT,
            references: {
                model: Class,
                key: 'id'
            },
        },
    },
    {
        underscored: true,
        timestamps: false,
        createAt: false,
        paranoid: true
    }
);

module.exports = Student
