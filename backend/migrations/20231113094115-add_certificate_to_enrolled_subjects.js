'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new column
    await queryInterface.addColumn('EnrolledSubjects', 'certificate', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the new column if needed
    await queryInterface.removeColumn('EnrolledSubjects', 'certificate');
  },
};
