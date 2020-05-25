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
    learnclass.belongsToMany(models.subject, {as:'learn_subject', through: 'learnchedule', foreignKey: 'Subject_Id', otherKey: 'Class_Id' });
  };
  return learnclass;
};
