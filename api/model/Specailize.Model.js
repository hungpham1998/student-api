

module.exports = (sequelize, Sequelize) => {
    const Specailize = sequelize.define('specailize',
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
        Note: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }
    );
    return Specailize;
}
