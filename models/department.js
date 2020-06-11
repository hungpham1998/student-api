'use strict';
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('departments', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Title: DataTypes.STRING,
    Note: DataTypes.STRING,
    IdPartment:  {
      type: DataTypes.UUID
    }
  }, {});
  department.associate = function(models) {
    // associations can be defined here
  };
  return department;
};
