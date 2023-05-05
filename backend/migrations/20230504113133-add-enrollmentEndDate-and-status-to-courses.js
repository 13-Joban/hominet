'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('courses', 'enrollmentEndDate', {
      type: Sequelize.DATE,
      defaultValue: '2023-05-20',
      allowNull: false
    });

    await queryInterface.addColumn('courses', 'status', {
      type: Sequelize.ENUM('draft', 'published', 'closed'),
      defaultValue: 'draft',
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
