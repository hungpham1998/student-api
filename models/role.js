'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('roles', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Note: DataTypes.STRING,
    Title: DataTypes.STRING
  }, {

  });
  role.associate = function(models) {
    // associations can be defined here
    //role.belongsToMany(models.account, {as:'role', through: 'accountrole', foreignKey: 'Role_Id', otherKey: 'Accout_Id'});
  };
  return role;
};
