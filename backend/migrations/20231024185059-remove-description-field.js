'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Subjects', 'description');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Subjects', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },
};
