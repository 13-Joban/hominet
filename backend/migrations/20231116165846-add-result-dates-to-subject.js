'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new columns
    await queryInterface.addColumn('Subjects', 'resultSubmissionStartDate', {
      type: Sequelize.DATE,
      defaultValue: '2024-07-12',
    });

    await queryInterface.addColumn('Subjects', 'resultSubmissionEndDate', {
      type: Sequelize.DATE,
      defaultValue: '2024-07-19',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes made in the up function

    // Remove the new columns
    await queryInterface.removeColumn('Subjects', 'resultSubmissionStartDate');
    await queryInterface.removeColumn('Subjects', 'resultSubmissionEndDate');
  },
};
