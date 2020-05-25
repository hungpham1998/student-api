'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('learnchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id: {
        type: Sequelize.BIGINT
      },
      Title: {
        type: Sequelize.STRING
      },
      NumberPeriods: {
        type: Sequelize.INTEGER
      },
      ClassRoom: {
        type: Sequelize.STRING
      },
      StartTime: {
        type: Sequelize.DATE
      },
      DuaDate: {
        type: Sequelize.DATE
      },
      Class_Id: {
        type: Sequelize.BIGINT
      },
      Subject_Id: {
        type: Sequelize.BIGINT
      },
      Acount_Id: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('learnchedules');
  }
};