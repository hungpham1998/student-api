'use strict';
module.exports = (sequelize, DataTypes) => {
  const attendancesheet = sequelize.define('attendancesheets', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4

    },
      Times: DataTypes.INTEGER,
      TimesDate: DataTypes.DATE,
      Note: DataTypes.STRING,
      accountId: {
        type: DataTypes.UUID,
        references: {
          model: 'accounts',
          key: 'Id',
        },
      },
    subjectId: {
      type: DataTypes.UUID,
      references: {
        model: 'subjects',
        key: 'Id',
      },
    },
    studentId: {
      type: DataTypes.UUID,
      references: {
        model: 'students',
        key: 'Id',
      },
    },
  }, {});
  attendancesheet.associate = function(models) {
    // associations can be defined here
  };
  return attendancesheet;
};
