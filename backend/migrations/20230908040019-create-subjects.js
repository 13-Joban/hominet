'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subjects', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subjectName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subjectCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subjectType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      credits: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      session: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      academicYear: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      isEnrolled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      enrollmentEndDate: {
        type: Sequelize.DATE,
        defaultValue: '2024-05-20',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subjects');
  },
};
