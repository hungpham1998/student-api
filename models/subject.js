'use strict';
module.exports = (sequelize, DataTypes) => {
  const subject = sequelize.define('subject', {
    Note: DataTypes.STRING,
    Title: DataTypes.STRING,
    Code: DataTypes.STRING,
    CreaditNuber: DataTypes.INTEGER,
    Year_Id: DataTypes.BIGINT
  }, {});
  subject.associate = function(models) {
    subject.belongsToMany(models.student, { as: 'learns_tudent', through: 'learnchedule', foreignKey: 'Student_Id', otherKey: 'Subject_Id' });
    subject.belongsToMany(models.account, { as:'learn_teachers',through: 'learnchedule', foreignKey: 'Subject_Id', otherKey: 'Account_Id' });
    subject.belongsToMany(models.learnclass, { as: 'learn_subject',through: 'learnchedule', foreignKey: 'Class_Id', otherKey: 'Subject_Id' });
    subject.belongsTo(models.learnyear, { foreignKey: 'Subject_Id', as: 'learnyears' });
    subject.hasOne(models.pointstudent, {foreignKey: 'Subject_Id', as: 'pointstudents'});
  };
  return subject;
};
