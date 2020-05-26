'use strict';
module.exports = (sequelize, DataTypes) => {
  const position = sequelize.define('position', {
    Note: DataTypes.STRING,
    Title: DataTypes.STRING
  }, {});
  position.associate = function(models) {
    // associations can be defined here
    position.hasMany(models.account, { as:'accounts', foreignKey: 'Position_Id', sourceKey: 'id' });
  };
  return position;
};
