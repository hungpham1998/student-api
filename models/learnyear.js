'use strict';
module.exports = (sequelize, DataTypes) => {
  const learnyear = sequelize.define('learnyears', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Title: DataTypes.STRING,
    Note: DataTypes.STRING
  }, {});
  learnyear.associate = function(models) {
   
  };
  return learnyear;
};
