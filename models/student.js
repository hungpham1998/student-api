'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('students', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Note: DataTypes.STRING,
    Last_Name: DataTypes.STRING,
    Frist_Name: DataTypes.STRING,
    Image: DataTypes.STRING,
    Address: DataTypes.STRING,
    Brithday: DataTypes.DATE,
    Code: DataTypes.STRING,
    learnclassId:{
      type: DataTypes.UUID,
      references: {
        model: 'learnclasses',
        key: 'Id',
      }
    },
  }, {});
  student.associate = function(models) {
    // associations can be defined here
    //student.hasMany(models.pointpracice, {as:'pointpracices', foreignKey: 'Student_Id', sourceKey: 'id' });
  };
  return student;
};
