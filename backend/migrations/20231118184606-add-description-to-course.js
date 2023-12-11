'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Courses', 'description', {
      type: Sequelize.STRING, // Keep the data type as STRING
      allowNull: false, // Adjust the allowNull property based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Courses', 'description');
  },
};
