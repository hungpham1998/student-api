

module.exports = (sequelize, Sequelize) => {
    const PointStudent = sequelize.define('pointstudent',
        {
        Id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        PointCC: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        PointKT1: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    
        PointKT2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    
        PointGk: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        PointT: {
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
        Id_Subject: {
            type: Sequelize.BIGINT,
            references: {
                model: Subject,
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
    return PointStudent;
}
