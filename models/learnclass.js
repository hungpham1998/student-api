'use strict';
module.exports = (sequelize, DataTypes) => {
  const learnclass = sequelize.define('learnclass', {
    Title: DataTypes.STRING,
    Note: DataTypes.STRING,
    Department_Id: DataTypes.INTEGER
  }, {});
  learnclass.associate = function(models) {
    // associations can be defined here
    learnclass.belongsTo(models.specailize, { as:'specailizes', foreignKey: 'Specailize_Id', targetKey: 'id'});
    learnclass.belongsToMany(models.subject, {as:'learnchedule', through: 'learnchedule', otherKey: 'Subject_Id', foreignKey: 'Class_Id' });
    learnclass.belongsToMany(models.student, { as: 'learnchedule',through: 'learnchedule',  foreignKey: 'Class_Id', otherKey: 'Student_Id' });
  };
  return learnclass;
};
