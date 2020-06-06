'use strict';
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('accounts', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,

    },
    UserName: DataTypes.STRING,
    Account: DataTypes.STRING,
    PassWord: DataTypes.STRING,
    Image: DataTypes.STRING,
    Mail: DataTypes.STRING,
    Address: DataTypes.STRING,
    departmentId: {
      type: DataTypes.UUID,
      references: {
        model: 'departments',
        key: 'Id',
      },
    },
    positionId: {
      type: DataTypes.UUID,
      references: {
        model: 'positions',
        key: 'Id',
      },
    }
  }, {});
  account.associate = function(models) {
   
  };
  return account;
};
