'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    Note: DataTypes.STRING,
    Last_Name: DataTypes.STRING,
    Frist_Name: DataTypes.STRING,
    Image: DataTypes.STRING,
    Address: DataTypes.STRING,
    Brithday: DataTypes.DATE,
    Code: DataTypes.STRING
  }, {});
  student.associate = function(models) {
    // associations can be defined here
    //student.hasMany(models.pointpracice, {as:'pointpracices', foreignKey: 'Student_Id', sourceKey: 'id' });
    student.belongsToMany(model.learnclass, { as: 'bookrooms',through: 'learnchedule', foreignKey: 'Student_Id', otherKey: 'Class_Id' });
    student.belongsToMany(models.subject, { as: 'calendarlearns', through: 'learnchedule', otherKey: 'Subject_Id', foreignKey: 'Student_Id' });
  };
  return student;
};
