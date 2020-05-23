

module.exports = (sequelize, Sequelize) => {
    const LearnYear = sequelize.define('learnyear',
        {
        Id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        LearnYear: {
            type: Sequelize.String,
            allowNull: false,
        }
    }
    );
    return LearnYear;
}
