'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('learnchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Title: {
        type: Sequelize.STRING
      },
      Semester: {
        type: Sequelize.INTEGER
      },
      ClassRoom: {
        type: Sequelize.STRING
      },
      StartTime: {
        type: Sequelize.DATE
      },
      DuaDate: {
        type: Sequelize.DATE
      },
      Class_Id: {
        type: Sequelize.BIGINT,
        references: { model: 'learclasses', key: 'id' },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
        allowNull: false,
      },
      Subject_Id: {
        type: Sequelize.BIGINT,
        references: { model: 'subjects', key: 'id' },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
        allowNull: false,
      },
      Acount_Id: {
        type: Sequelize.BIGINT,
        references: { model: 'accounts', key: 'id' },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
        allowNull: false,
      },
      Student_Id: {
        type: Sequelize.BIGINT,
        references: { model: 'students', key: 'id' },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
        allowNull: false,
      },
      Year_Id: {
        type: Sequelize.BIGINT,
        references: { model: 'learnyears', key: 'id' },
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
    return queryInterface.dropTable('learnchedules');
  }
};
