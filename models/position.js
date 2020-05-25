'use strict';
module.exports = (sequelize, DataTypes) => {
  const position = sequelize.define('position', {
    Id: DataTypes.BIGINT,
    Note: DataTypes.STRING,
    Title: DataTypes.STRING
  }, {});
  position.associate = function(models) {
    // associations can be defined here
   position.hasMany(models.account, { foreignKey: 'Position_Id', targetKey: 'Id' });
  };
  return position;
};
