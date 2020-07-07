'use strict';
module.exports = (sequelize, DataTypes) => {
  const subject = sequelize.define('subjects', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Note: DataTypes.STRING,
    Title: DataTypes.STRING,
    Code: DataTypes.STRING,
    CreaditNumber: DataTypes.INTEGER,
    semesterId: {
      type: DataTypes.UUID,
      references: {
        model: 'semesters',
        key: 'Id',
      }
    }
  }, {});
  subject.associate = function(models) {

  };
  return subject;
};
