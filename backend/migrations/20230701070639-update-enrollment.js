'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('EnrolledCourses', 'session');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('EnrolledCourses', 'session', {
      type: Sequelize.STRING,
      defaultValue: 'Jan-June 2023',
      allowNull: false,
    });

  }
};
