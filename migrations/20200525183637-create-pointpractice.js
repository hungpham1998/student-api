'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pointpractices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Peactice: {
        type: Sequelize.STRING
      },
      Student_Id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id'
        }
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
    return queryInterface.dropTable('pointpractices');
  }
};
