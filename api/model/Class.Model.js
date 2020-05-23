
module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define('class',
        {
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        class_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        specialized_id: {
            type: Sequelize.BIGINT,
            references: {
                model: Specialized,
                key: 'id'
            },
        }
    }, {
        underscored: true,
        timestamps: false,
        createAt: false,
            paranoid: true
        }
    );
    return Class;
}
