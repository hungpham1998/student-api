const  db =require('../config/db.config');
const Class = db.Class;

module.exports = (sequelize, Sequelize) => {
    const LearnChedule = sequelize.define('learnchedule',
        {
        Id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        NumberPeriods: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        ClassRoom:  {
            type: Sequelize.STRING,
            allowNull: false,
        },
        StartTime: {
            type: Sequelize.DATE,
        },
        DuaDate:{
            type: Sequelize.DATE,
        },
        Id_Class: {
            type: Sequelize.BIGINT,
            references: {
                model: Class,
                key: 'Id'
            },
        },
        Id_Subject: {
            type: Sequelize.BIGINT,
            references: {
                model: Subject,
                key: 'Id'
            },
        },
        Id_Account : {
            type: Sequelize.BIGINT,
            references: {
                model: Account,
                key: 'Id'
            },
        }
    }
    );
    return LearnChedule;
}
