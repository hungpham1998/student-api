'use strict';
module.exports = (sequelize, DataTypes) => {
  const pointpractice = sequelize.define('pointpractice', {
    Peactice: DataTypes.STRING,
    Student_Id: DataTypes.BIGINT,
    Year_Id: DataTypes.BIGINT
  }, {});
  pointpractice.associate = function(models) {
    // associations can be defined here
    pointpractice.belongsTo(models.student, {as: 'students', foreignKey: 'Student_Id', targetKey: 'id' });
    pointpractice.belongsToMany(models.learnyear, {as:'practice_rate' ,through: 'yearpractice', foreignKey: 'Practice_Id', otherKey: 'Year_Id' });
  };
  return pointpractice;
};
