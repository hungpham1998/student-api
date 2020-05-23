

import Department from './Department.Model';
import Position from './Position.Model';

module.exports = (sequelize, Sequelize) => {
    const Acount = sequelize.define('acount',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            UserName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Account: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            PassWord: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Image: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Mail: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Address:  {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Id_Department: {
                type: Sequelize.BIGINT,
                references: {
                    model: Department,
                    key: 'Id'
                },
            },
            Id_Position : {
                type: Sequelize.BIGINT,
                references: {
                    model: Position,
                    key: 'Id'
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
    return Acount;
}
