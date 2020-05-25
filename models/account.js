'use strict';
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('account', {
    Id: DataTypes.BIGINT,
    UserName: DataTypes.STRING,
    Account: DataTypes.STRING,
    PassWord: DataTypes.STRING,
    Image: DataTypes.STRING,
    Mail: DataTypes.STRING,
    Adrees: DataTypes.STRING
  }, {});
  account.associate = function(models) {
    account.belongsTo(models.department, { foreignKey: 'Department_Id', targetKey: 'Id' });
    account.belongsTo(models.position, { foreignKey: 'Position_Id', targetKey: 'Id' });
    account.belongsToMany(models.role, { as:'account_role', through: 'account_role', foreignKey: 'Accout_Id', otherKey: 'Role_Id' });
    account.belongsToMany(models.subject, {as:'learn_subject', through:'learnchedule',foreignKey: 'Account_Id', otherKey: 'Subject_Id' })
  };
  return account;
};
