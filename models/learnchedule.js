'use strict';
module.exports = (sequelize, DataTypes) => {
  const learnchedule = sequelize.define('learnchedule', {
    Title: DataTypes.STRING,
    Semester: DataTypes.INTEGER,
    ClassRoom: DataTypes.STRING,
    StartTime: DataTypes.DATE,
    DuaDate: DataTypes.DATE,
    Class_Id: DataTypes.BIGINT,
    Subject_Id: DataTypes.BIGINT,
    Acount_Id: DataTypes.BIGINT,
    Student_Id: DataTypes.BIGINT,
    Year_Id: DataTypes.BIGINT
  }, {});
  learnchedule.associate = function(models) {
    // associations can be defined here
  };
  return learnchedule;
};
