'use strict';
module.exports = (sequelize, DataTypes) => {
  const position = sequelize.define('positions', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Note: DataTypes.STRING,
    Title: DataTypes.STRING
  }, {});
  position.associate = function(models) {
    // associations can be defined here
  };
  return position;
};
