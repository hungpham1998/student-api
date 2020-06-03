'use strict';
module.exports = (sequelize, DataTypes) => {
  const specailized = sequelize.define('specailized', {
    Note: DataTypes.STRING,
    Title: DataTypes.STRING,
    Code: DataTypes.STRING
  }, {});
  specailized.associate = function(models) {
    // associations can be defined here
  };
  return specailized;
};
