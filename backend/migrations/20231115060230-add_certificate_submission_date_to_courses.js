'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Courses', 'certificateSubmissionDate', {
      type: Sequelize.DATE,
      defaultValue: '2024-07-22',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Courses', 'certificateSubmissionDate');
  }
};
