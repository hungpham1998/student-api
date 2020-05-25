'use strict';
module.exports = (sequelize, DataTypes) => {
  const pointstudent = sequelize.define('pointstudent', {
    PontCC: DataTypes.INTEGER,
    PointKT1: DataTypes.INTEGER,
    PointKT2: DataTypes.INTEGER,
    PointGK: DataTypes.INTEGER,
    PointT: DataTypes.INTEGER,
    Subject_Id: DataTypes.BIGINT,
    Student_Id: DataTypes.BIGINT
  }, {});
  pointstudent.associate = function(models) {
    // associations can be defined here
    pointstudent.belongsTo(models.subject, {as:'subjects', foreignKey: 'Subject_Id', targetKey: 'id'});
  };
  return pointstudent;
};
