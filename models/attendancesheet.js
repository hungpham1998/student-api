'use strict';
module.exports = (sequelize, DataTypes) => {
  const attendancesheet = sequelize.define('attendancesheets', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4

    },
      Times: DataTypes.INTEGER,
      TimesDate: DataTypes.Date,
      accountId: {
        type: DataTypes.UUID,
        references: {
          model: 'accounts',
          key: 'Id',
        },
      },
    learnclassId: {
      type: DataTypes.UUID,
      references: {
        model: 'learnclasses',
        key: 'Id',
      },
    }
  }, {});
  attendancesheet.associate = function(models) {
    // associations can be defined here
  };
  return attendancesheet;
};
