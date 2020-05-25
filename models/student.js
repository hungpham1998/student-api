'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    Note: DataTypes.STRING,
    Last_Name: DataTypes.STRING,
    Frist_Name: DataTypes.STRING,
    Image: DataTypes.STRING,
    Adress: DataTypes.STRING,
    Brithday: DataTypes.DATE,
    Class_Id: DataTypes.BIGINT
  }, {});
  student.associate = function(models) {
    // associations can be defined here
    student.hasMany(models.pointpracice, {as:'pointpracices', foreignKey: 'Student_Id', targetKey: 'id' });
    student.belongsToMany(models.subject, { as: 'subject_learns', through: 'learnchedule', foreignKey: 'Subject_Id', otherKey: 'Student_Id' });
  };
  return student;
};
