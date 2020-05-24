

module.exports = (sequelize, Sequelize) => {
    const PointPractice = sequelize.define('pointpractice',
        {
        Id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Peactice: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Id_Student: {
            type: Sequelize.BIGINT,
            references: {
                model: Student,
                key: 'Id'
            },
        },
        Id_Year : {
            type: Sequelize.BIGINT,
            references: {
                model: LearnYear,
                key: 'Id'
            },
        }
        
    }, {
        underscored: true,
        timestamps: false,
        createAt: false,
            paranoid: true
        }
    );
    return PointPractice;
}
