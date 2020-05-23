
module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define('department',
        {
        Id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Id_Department: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        Title: {
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
    return Department;
}
