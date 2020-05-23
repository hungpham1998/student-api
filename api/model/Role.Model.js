

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
            type: Sequelize.String,
            allowNull: false,
        }
    }
    );
    return Role;
}
