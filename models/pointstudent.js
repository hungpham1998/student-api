'use strict';
module.exports = (sequelize, DataTypes) => {
  const pointstudent = sequelize.define('pointstudents', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    PointCC: DataTypes.FLOAT,
    PointKT1: DataTypes.FLOAT,
    PointKT2: DataTypes.FLOAT,
    PointGK: DataTypes.FLOAT,
    PointT: DataTypes.FLOAT,
    PointTK: DataTypes.FLOAT,
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
    },
    // semesterId: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: 'semesters',
    //     key: 'Id',
    //   }
    // }
  }, {});
  pointstudent.associate = function(models) {

  };
  return pointstudent;
};
