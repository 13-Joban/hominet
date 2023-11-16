'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new columns
    await queryInterface.addColumn('Courses', 'certificateSubmissionStartDate', {
      type: Sequelize.DATE,
      defaultValue: '2024-07-12'
    });

    await queryInterface.addColumn('Courses', 'certificateSubmissionEndDate', {
      type: Sequelize.DATE,
      defaultValue:  '2024-07-19'
    });

    // Remove the old column
    await queryInterface.removeColumn('Courses', 'certificateSubmissionDate');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes made in the up function

    // Remove the new columns
    await queryInterface.removeColumn('Courses', 'certificateSubmissionStartDate');
    await queryInterface.removeColumn('Courses', 'certificateSubmissionEndDate');

    // Add back the old column
    await queryInterface.addColumn('Courses', 'certificateSubmissionDate', {
      type: Sequelize.DATE,
      defaultValue: '2024-07-22',
    });
  },
};
