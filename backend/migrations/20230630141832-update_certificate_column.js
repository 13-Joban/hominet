// migrations/20230630140604-update_certificate_column.js

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('EnrolledCourses', 'certificate', {
      type: Sequelize.STRING,
      allowNull: true, // Allow null values in the certificate field
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('EnrolledCourses', 'certificate', {
      type: Sequelize.STRING,
      allowNull: false, // Revert back to disallowing null values
    });
  }
};
