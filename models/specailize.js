'use strict';
module.exports = (sequelize, DataTypes) => {
  const specailize = sequelize.define('specailize', {
    Id: DataTypes.BIGINT,
    Note: DataTypes.STRING,
    Title: DataTypes.STRING,
    Code: DataTypes.STRING
  }, {});
  specailize.associate = function(models) {
    // associations can be defined here
    specailize.hasMany( models.learnclass, { foreignKey: 'Specailize_Id', targetKey: 'Id' });
  };
  return specailize;
};
