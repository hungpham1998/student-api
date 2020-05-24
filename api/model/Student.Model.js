
import Class from './Class.Model';

module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('student',
        {
            Id: {
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
            Image: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            brithday: {
                type: Sequelize.DATE
            },
            Id_Class: {
                type: Sequelize.BIGINT,
                references: {
                    model: Class,
                    key: 'Id'
                },
            }
        },
        {
            underscored: true,
            timestamps: false,
            createAt: false,
            paranoid: true
        }
    );
    return Student;
}
