'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('accountroles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Account_Id: {
        type: DataTypes.INTEGER,
        references: { model: 'accounts', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      Role_Id: {
        type: DataTypes.INTEGER,
        references: { model: 'roles', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('accountroles');
  }
};
