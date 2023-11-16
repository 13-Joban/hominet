// The new migration file
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('subjects', ['subjectCode']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('subjects', ['subjectCode']);
  },
};
