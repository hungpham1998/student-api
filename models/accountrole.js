'use strict';
module.exports = (sequelize, DataTypes) => {
  const accountrole = sequelize.define('accountrole', {
    Role_Id: DataTypes.BIGINT,
    Account_Id: DataTypes.BIGINT
  }, {});
  accountrole.associate = function(models) {
    // associations can be defined here
  };
  return accountrole;
};
