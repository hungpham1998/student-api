
module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define('class',
        {
        Id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        class_name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
        // specialized_id: {
        //     type: Sequelize.BIGINT,
        //     references: {
        //         model: Specialized,
        //         key: 'id'
        //     },
        // }
    }
    );
    return Class;
}
