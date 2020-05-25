'use strict';
module.exports = (sequelize, DataTypes) => {
  const learnyear = sequelize.define('learnyear', {
    Id: DataTypes.BIGINT,
    LearnYear: DataTypes.STRING,
    Note: DataTypes.STRING
  }, {});
  learnyear.associate = function(models) {
    // associations can be defined here

    learnyear.hasMany(models.subject, { foreignKey: 'Year_Id', targetKey: 'Id' });
    learnyear.belongsToMany(models.pointpractice, {as:'year_rate' ,through: 'yearpractice', foreignKey: 'Year_Id', otherKey: 'Practice_Id' });
  };
  return learnyear;
};
