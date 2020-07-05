'use strict';
module.exports = (sequelize, DataTypes) => {
  const semester = sequelize.define('semesters', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4

    },
    Title: DataTypes.STRING,
    Note: DataTypes.STRING,
    Code: DataTypes.STRING,
    learnyearId: {
      type: DataTypes.UUID,
      references: {
        model: 'learnyears',
        key: 'Id',
      },
    }
  }, {});
  semester.associate = function(models) {
  };
  return semester;
};
