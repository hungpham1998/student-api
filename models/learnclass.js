'use strict';
module.exports = (sequelize, DataTypes) => {
  const learnclass = sequelize.define('learnclasses', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4

    },
    Title: DataTypes.STRING,
    Note: DataTypes.STRING,
    specailizedId: {
      type: DataTypes.UUID,
      references: {
        model: 'specailizeds',
        key: 'Id',
      },
    }
  }, {});
  learnclass.associate = function(models) {
    // associations can be defined here
  };
  return learnclass;
};
