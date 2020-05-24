
module.exports = (sequelize, Sequelize) => {
    const Position = sequelize.define('position',
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
    return Position;
}
