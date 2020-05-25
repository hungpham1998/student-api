'use strict';
module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    Title: DataTypes.STRING,
    Note: DataTypes.STRING,
    IdParmanet: DataTypes.BIGINT
  }, {});
  department.associate = function(models) {
    // associations can be defined here
    department.hasMany(models.account, {as:'accounts', foreignKey: 'Department_Id', targetKey: 'id'});
  };
  return department;
};
