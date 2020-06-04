'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accountroles', {
      Account_Id: {
        type: DataTypes.INTEGER,
        references: { model: 'accounts', key: 'id' },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
        allowNull: false,
      },
      Role_Id: {
        type: DataTypes.INTEGER,
        references: { model: 'roles', key: 'id' },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
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
    return queryInterface.dropTable('accountroles');
  }
};
