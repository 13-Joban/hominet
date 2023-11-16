'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update column names
    await queryInterface.renameColumn('Students', 'sgpa1st', 'sgpa1');
    await queryInterface.renameColumn('Students', 'sgpa2nd', 'sgpa2');
    await queryInterface.renameColumn('Students', 'sgpa3rd', 'sgpa3');
    await queryInterface.renameColumn('Students', 'sgpa4th', 'sgpa4');
    await queryInterface.renameColumn('Students', 'sgpa5th', 'sgpa5');
    await queryInterface.renameColumn('Students', 'sgpa6th', 'sgpa6');
    await queryInterface.renameColumn('Students', 'sgpa7th', 'sgpa7');
    await queryInterface.renameColumn('Students', 'sgpa8th', 'sgpa8');
    // ... Repeat for other columns

    // Other changes you might need (add/drop columns, etc.)
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback changes if needed
    await queryInterface.renameColumn('Students', 'sgpa1', 'sgpa1st');
    await queryInterface.renameColumn('Students', 'sgpa2', 'sgpa2nd');
    await queryInterface.renameColumn('Students', 'sgpa3', 'sgpa3rd');
    await queryInterface.renameColumn('Students', 'sgpa4', 'sgpa4th');
    await queryInterface.renameColumn('Students', 'sgpa5', 'sgpa5th');
    await queryInterface.renameColumn('Students', 'sgpa6', 'sgpa6th');
    await queryInterface.renameColumn('Students', 'sgpa7', 'sgpa7th');
    await queryInterface.renameColumn('Students', 'sgpa8', 'sgpa8th');
    // ... Repeat for other columns

    // Other rollback changes
  }
};
