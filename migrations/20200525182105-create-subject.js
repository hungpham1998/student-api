'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Note: {
        type: Sequelize.STRING
      },
      Title: {
        type: Sequelize.STRING
      },
      Code: {
        type: Sequelize.STRING
      },
      CreaditNuber: {
        type: Sequelize.INTEGER
      },
      Year_Id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'learnyears',
          key: 'id'
        }
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
    return queryInterface.dropTable('subjects');
  }
};
