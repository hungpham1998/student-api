'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('yearpractices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Year_Id: {
        type: DataTypes.INTEGER,
        references: { model: 'learnyears', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      Practice_Id: {
        type: DataTypes.INTEGER,
        references: { model: 'pointpractices', key: 'id' },
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
    queryInterface.dropTable('yearpractices');
  }
};
