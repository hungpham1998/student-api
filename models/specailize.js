'use strict';
module.exports = (sequelize, DataTypes) => {
  const specailize = sequelize.define('specailize', {
    Note: DataTypes.STRING,
    Title: DataTypes.STRING,
    Code: DataTypes.STRING
  }, {});
  specailize.associate = function(models) {
    // associations can be defined here
    specailize.hasMany( models.learnclass, {as:'learnclasses', foreignKey: 'Specailize_Id', sourceKey: 'id' });
  };
  return specailize;
};
