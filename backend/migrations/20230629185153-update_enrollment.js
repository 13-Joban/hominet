'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('EnrolledCourses', 'certificate', {
      type: Sequelize.BLOB,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('EnrolledCourses', 'certificate', {
      type: Sequelize.STRING,
    });
  },
};
