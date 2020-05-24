
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
            type: Sequelize.STRING,
            allowNull: false,
        },
        Code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        CreditNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Note: {
            type: Sequelize.STRING,
            allowNull: false,
            },
        Id_Year: {
            type: Sequelize.BIGINT,
            references: {
                model: Year,
                key: 'Id'
            },
        }
        
    }
    );
    return Subject;
}
