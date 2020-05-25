'use strict';
module.exports = (sequelize, DataTypes) => {
  const learnclass = sequelize.define('learnclass', {
    Id: DataTypes.BIGINT,
    Title: DataTypes.STRING,
    Note: DataTypes.STRING,
    Specailize_Id: DataTypes.INTEGER
  }, {});
  learnclass.associate = function (models) {
    learnclass.belongsTo(models.specailize, { foreignKey: 'Specailize_Id', targetKey: 'Id'});
    learnclass.belongsToMany(models.subject, {as:'learn_subject', through: 'learnchedule', foreignKey: 'Subject_Id', otherKey: 'Class_Id' });
  };
  return learnclass;
};
