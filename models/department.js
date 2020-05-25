'use strict';
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    Id: DataTypes.BIGINT,
    Title: DataTypes.STRING,
    Note: DataTypes.STRING,
    IdParmanet: DataTypes.BIGINT
  }, {});
  department.associate = function(models) {
    department.hasMany(models.account, {foreignKey: 'Department_Id', targetKey: 'Id'});
  };
  return department;
};
