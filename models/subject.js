'use strict';
module.exports = (sequelize, DataTypes) => {
  const subject = sequelize.define('subject', {
    Note: DataTypes.STRING,
    Title: DataTypes.STRING,
    Code: DataTypes.STRING,
    CreaditNuber: DataTypes.INTEGER
  }, {});
  subject.associate = function(models) {
    // associations can be defined here
    subject.belongsToMany(models.student, { as: 'learnchedule', through: 'learnchedule', otherKey: 'Student_Id', foreignKey: 'Subject_Id' });
    subject.belongsToMany(models.account, { as:'learn_teachers',through: 'learnchedule', foreignKey: 'Subject_Id', otherKey: 'Account_Id' });
    subject.belongsToMany(models.learnclass, { as: 'learnchedule',through: 'learnchedule', otherKey: 'Class_Id', foreignKey: 'Subject_Id' });
    subject.belongsTo(models.learnyear, { foreignKey: 'Subject_Id', as: 'learnyears' });
    subject.hasOne(models.pointstudent, {foreignKey: 'Subject_Id', as: 'pointstudents',targetKey: 'id'});
  };
  return subject;
};
