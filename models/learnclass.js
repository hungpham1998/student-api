'use strict';
module.exports = (sequelize, DataTypes) => {
  const learnclass = sequelize.define('learnclass', {
    Id: DataTypes.BIGINT,
    Title: DataTypes.STRING,
    Note: DataTypes.STRING,
    Specailize_Id: DataTypes.BIGINT
  }, {});
  learnclass.associate = function(models) {
    // associations can be defined here
    learnclass.belongsTo(models.specailize, { as:'specailizes', foreignKey: 'Specailize_Id', targetKey: 'id'});
    learnclass.belongsToMany(models.subject, {as:'learnchedule', through: 'learnchedule', otherKey: 'Subject_Id', foreignKey: 'Class_Id' });
    learnclass.belongsToMany(models.student, { as: 'learnchedule',through: 'learnchedule',  foreignKey: 'Class_Id', otherKey: 'Student_Id' });
  };
  return learnclass;
};
