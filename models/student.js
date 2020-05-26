'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    Note: DataTypes.STRING,
    Last_Name: DataTypes.STRING,
    Frist_Name: DataTypes.STRING,
    Image: DataTypes.STRING,
    Adress: DataTypes.STRING,
    Brithday: DataTypes.DATE,
    Code: DataTypes.STRING
  }, {});
  student.associate = function(models) {
    // associations can be defined here
    student.hasMany(models.pointpracice, {as:'pointpracices', foreignKey: 'Student_Id', sourceKey: 'id' });
    student.belongsToMany(model.learnclass, { as: 'learnchedule',through: 'learnchedule', foreignKey: 'Student_Id', otherKey: 'Class_Id' });
    student.belongsToMany(models.subject, { as: 'learnchedule', through: 'learnchedule', otherKey: 'Subject_Id', foreignKey: 'Student_Id' });
  };
  return student;
};
