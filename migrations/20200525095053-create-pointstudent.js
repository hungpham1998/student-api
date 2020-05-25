'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pointstudents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id: {
        type: Sequelize.BIGINT
      },
      PointCC: {
        type: Sequelize.INTEGER
      },
      PointKT1: {
        type: Sequelize.INTEGER
      },
      PointKT2: {
        type: Sequelize.INTEGER
      },
      PointGK: {
        type: Sequelize.INTEGER
      },
      PointT: {
        type: Sequelize.INTEGER
      },
      Subject_Id: {
        type: Sequelize.BIGINT
      },
      Student_Id: {
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
    return queryInterface.dropTable('pointstudents');
  }
};
