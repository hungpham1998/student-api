'use strict';
module.exports = (sequelize, DataTypes) => {
  const specailized = sequelize.define('specailizeds', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Note: DataTypes.STRING,
    Title: DataTypes.STRING,
    Code: DataTypes.STRING
  }, {});
  specailized.associate = function(models) {
    // associations can be defined here
  };
  return specailized;
};
