'use strict';
module.exports = (sequelize, DataTypes) => {
  const pointpractice = sequelize.define('pointpractices', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Peactice: DataTypes.STRING,
    studentId: {
      type: DataTypes.UUID,
      references: {
        model: 'students',
        key: 'Id',
      },},
    Note: DataTypes.STRING,
    yearnId: {
      type: DataTypes.UUID,
      references: {
        model: 'learnyears',
        key: 'Id',
      },
    }
  }, {});
  pointpractice.associate = function(models) {
    // associations can be defined here
    
  };
  return pointpractice;
};
