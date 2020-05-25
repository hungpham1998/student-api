'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    Id: DataTypes.BIGINT,
    Note: DataTypes.STRING,
    Title: DataTypes.STRING
  }, {});
  role.associate = function(models) {
    // associations can be defined here
    role.belongsToMany(models.account, {as:'role_account', through: 'account_role', foreignKey: 'Role_Id', otherKey: 'Accout_Id'});
  };
  return role;
};
