'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Note: {
        type: Sequelize.STRING
      },
      Last_Name: {
        type: Sequelize.STRING
      },
      Frist_Name: {
        type: Sequelize.STRING
      },
      Image: {
        type: Sequelize.STRING
      },
      Adress: {
        type: Sequelize.STRING
      },
      Brithday: {
        type: Sequelize.DATE
      },
      Class_Id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'learnclasses',
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
    return queryInterface.dropTable('students');
  }
};
