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
        allowNull: false,
        type: Sequelize.STRING
     
      },
      Last_Name: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      Frist_Name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Adress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Brithday: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Code: {
        allowNull: false,
        type: Sequelize.STRING
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
