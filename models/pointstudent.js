'use strict';
module.exports = (sequelize, DataTypes) => {
  const pointstudent = sequelize.define('pointstudents', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    PontCC: DataTypes.INTEGER,
    PointKT1: DataTypes.INTEGER,
    PointKT2: DataTypes.INTEGER,
    PointGK: DataTypes.INTEGER,
    PointT: DataTypes.INTEGER,
    subjectId: {
      type: DataTypes.UUID,
      references: {
        model: 'subjects',
        key: 'Id',
      }
    },
    studentId: {
      type: DataTypes.UUID,
      references: {
        model: 'students',
        key: 'Id',
      }
    }
  }, {});
  pointstudent.associate = function(models) {
    // associations can be defined here

  };
  return pointstudent;
};
