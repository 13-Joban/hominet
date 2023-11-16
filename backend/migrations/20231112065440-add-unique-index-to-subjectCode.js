// The new migration file
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('subjects', ['subjectCode'], {
      unique: true,
      name: 'unique_subjectCode_index',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('subjects', 'unique_subjectCode_index');
  },
};
