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
    await queryInterface.addColumn('Students', 'contactno', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Students', 'semester', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Students', 'branch', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Students', 'year', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Students', 'passing_out_year', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Students', 'contactno');
    await queryInterface.removeColumn('Students', 'semester');
    await queryInterface.removeColumn('Students', 'branch');
    await queryInterface.removeColumn('Students', 'year');
    await queryInterface.removeColumn('Students', 'passing_out_year');
  }
};
