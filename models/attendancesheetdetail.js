'use strict';
module.exports = (sequelize, DataTypes) => {
  const attendancesheetdetail = sequelize.define('attendancesheetdetails', {
      Note: DataTypes.STRING,
      Numbertimes: DataTypes.INTEGER,
      studentId: {
        type: DataTypes.UUID,
        references: {
          model: 'students',
          key: 'Id',
        },
      },
      attendancesheetId: {
      type: DataTypes.UUID,
      references: {
        model: 'attendancesheets',
        key: 'Id',
      },
    }
  }, {});
  attendancesheetdetail.associate = function(models) {
    // associations can be defined here
  };
  return attendancesheetdetail;
};
