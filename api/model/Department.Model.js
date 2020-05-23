
module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define('Department',
        {
        Id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        IdPartment: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        Title: {
            type: Sequelize.String,
            allowNull: false,
        }
    })
    return Department1;
}
