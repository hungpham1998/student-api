'use strict';
module.exports = (sequelize, DataTypes) => {
  const pointstudent = sequelize.define('pointstudent', {
    Id: DataTypes.BIGINT,
    PointCC: DataTypes.INTEGER,
    PointKT1: DataTypes.INTEGER,
    PointKT2: DataTypes.INTEGER,
    PointGK: DataTypes.INTEGER,
    PointT: DataTypes.INTEGER,
    Subject_Id: DataTypes.BIGINT,
    Student_Id: DataTypes.BIGINT
  }, {});
  pointstudent.associate = function(models) {
    // associations can be defined here
    pointstudent.belongsTo(db.subject, {foreignKey: 'Subject_Id', targetKey: 'Id'});
  };
  return pointstudent;
};
