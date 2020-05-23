import Year from './LearnYear.Model';



module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define('subject',
        {
        Id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Title: {
            type: Sequelize.String,
            allowNull: false,
        },
        Code: {
            type: Sequelize.String,
            allowNull: false,
        },
        CreditNumber: {
            type: Sequelize.String,
            allowNull: false,
        },
        Note: {
            type: Sequelize.String,
            allowNull: false,
            },
        Id_Year: {
            type: Sequelize.BIGINT,
            references: {
                model: Year,
                key: 'Id'
            },
        }
        
    }, {
        underscored: true,
        timestamps: false,
        createAt: false,
            paranoid: true
        }
    );
    return Subject;
}
