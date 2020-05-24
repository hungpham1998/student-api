

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role',
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
        }
    }
    );
    return Role;
}
