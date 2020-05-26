'use strict';
module.exports = (sequelize, DataTypes) => {
  const learnyear = sequelize.define('learnyear', {
    LearnYear: DataTypes.STRING,
    Note: DataTypes.STRING
  }, {});
  learnyear.associate = function(models) {
    // associations can be defined here
    learnyear.hasMany(models.subject, { as:'subjects',foreignKey: 'Year_Id', targetKey: 'id' });
    learnyear.belongsToMany(models.pointpractice, {as:'year_rate' ,through: 'yearpractices', foreignKey: 'Year_Id', otherKey: 'Practice_Id' });
  };
  return learnyear;
};
