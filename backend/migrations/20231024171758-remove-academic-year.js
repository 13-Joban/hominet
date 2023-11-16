'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Subjects', 'academicYear');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Subjects', 'academicYear', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
