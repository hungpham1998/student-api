'use strict';
module.exports = (sequelize, DataTypes) => {
  const pointpractice = sequelize.define('pointpractice', {
    Peactice: DataTypes.STRING,
    Student_Id: DataTypes.BIGINT,
    Note: DataTypes.STRING,
    Yearn_Id: DataTypes.BIGINT
  }, {});
  pointpractice.associate = function(models) {
    // associations can be defined here
    pointpractice.belongsTo(models.student, {as: 'students', foreignKey: 'Student_Id', targetKey: 'id' });
    pointpractice.belongsTo(models.learnyear, {foreignKey: 'Year_Id', targetKey: 'id' });
  };
  return pointpractice;
};
