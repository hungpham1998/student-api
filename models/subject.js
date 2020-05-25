'use strict';
module.exports = (sequelize, DataTypes) => {
  const subject = sequelize.define('subject', {
    Id: DataTypes.BIGINT,
    Note: DataTypes.STRING,
    Title: DataTypes.STRING,
    Code: DataTypes.STRING,
    CreaditNuber: DataTypes.INTEGER,
    Year_Id: DataTypes.BIGINT
  }, {});
  subject.associate = function(models) {
    // associations can be defined here
  };
  return subject;
};