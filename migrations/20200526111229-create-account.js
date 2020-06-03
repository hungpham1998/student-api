'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserName: {
        type: Sequelize.STRING
      },
      Account: {
        type: Sequelize.STRING
      },
      PassWord: {
        type: Sequelize.STRING
      },
      Image: {
        type: Sequelize.STRING
      },
      Mail: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      Department_Id: {
        type: Sequelize.BIGINT,
        references: { model: 'departments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      Postion_Id: {
        type: Sequelize.BIGINT,
        references: { model: 'positions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
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
    return queryInterface.dropTable('accounts');
  }
};
