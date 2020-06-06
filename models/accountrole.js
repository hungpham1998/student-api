'use strict';
module.exports = (sequelize, DataTypes) => {
  const accountrole = sequelize.define('accountroles', {
    roleId:  {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'Id',
      },
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'Id',
      },
    }
  }, {});
  accountrole.associate = function(models) {
    // associations can be defined here
  };
  return accountrole;
};
