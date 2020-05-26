'use strict';
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('account', {
    Id: DataTypes.BIGINT,
    UserName: DataTypes.STRING,
    Account: DataTypes.STRING,
    PassWord: DataTypes.STRING,
    Image: DataTypes.STRING,
    Mail: DataTypes.STRING,
    Adrees: DataTypes.STRING,
    Department_Id: DataTypes.BIGINT,
    Position_Id: DataTypes.BIGINT
  }, {});
  account.associate = function(models) {
    // associations can be defined here
    account.belongsTo(models.department, {as: 'departments', foreignKey: 'Department_Id', targetKey: 'id'});
    account.belongsTo(models.position, { as: 'positions' , foreignKey: 'Position_Id',targetKey: 'id' });
    account.belongsToMany(models.role, { as:'account', through: 'accountrole', foreignKey: 'Accout_Id', otherKey: 'Role_Id' });
    account.belongsToMany(models.subject, {as:'learn_subject', through:'learnchedule',foreignKey: 'Account_Id', otherKey: 'Subject_Id' })
  };
  return account;
};
