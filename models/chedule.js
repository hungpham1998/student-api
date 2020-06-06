'use strict';
module.exports = (sequelize, DataTypes) => {
  const chedule = sequelize.define('chedules', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    Title: DataTypes.STRING,
    Semester: DataTypes.INTEGER,
    ClassRoom: DataTypes.STRING,
    StartTime: DataTypes.DATE,
    DuaDate: DataTypes.DATE,
    classId:   {
        type: DataTypes.UUID,
        references: {
          model: 'learnclasses',
          key: 'Id',
        }
      }
    ,
    subjectId:{
        type: DataTypes.UUID,
        references: {
          model: 'subjects',
          key: 'Id',
        }
      },
    acountId: {
      type: DataTypes.UUID,
      references: {
        model: 'accounts',
        key: 'Id',
      }
    },
    studentId:  {
      type: DataTypes.UUID,
      references: {
        model: 'students',
        key: 'Id',
      }
    },
    yearId:  {
      type: DataTypes.UUID,
      references: {
        model: 'learnyears',
        key: 'Id',
      }
    }
  }, {});
  chedule.associate = function(models) {

  };
  return chedule;
};
