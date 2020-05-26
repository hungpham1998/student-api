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
      Id: {
        type: Sequelize.BIGINT
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
      Adrees: {
        type: Sequelize.STRING
      },
      Department_Id: {
        type: Sequelize.BIGINT,
        references: { model: 'departments', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      Position_Id: {
        type: Sequelize.BIGINT,
        references: { model: 'positions', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
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
