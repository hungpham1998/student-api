

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
            type: Sequelize.String,
            allowNull: false,
        },
         Code: {
            type: Sequelize.String,
            allowNull: false,
        },
        Note: {
            type: Sequelize.String,
            allowNull: false,
        }
    }, {
        underscored: true,
        timestamps: false,
        createAt: false,
            paranoid: true
        }
    );
    return Specailize;
}
