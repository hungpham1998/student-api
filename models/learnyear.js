'use strict';
module.exports = (sequelize, DataTypes) => {
  const learnyear = sequelize.define('learnyear', {
    LearnYear: DataTypes.STRING,
    Note: DataTypes.STRING
  }, {});
  learnyear.associate = function(models) {
    // associations can be defined here
    learnyear.hasMany(models.pointpractice, {as:'year_rate', foreignKey: 'Year_Id', sourceKey: 'id' });
  };
  return learnyear;
};
