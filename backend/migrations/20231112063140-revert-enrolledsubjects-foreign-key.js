'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('EnrolledSubjects', 'subjectId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('EnrolledSubjects', 'subjectId', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'subjectCode',
      },
    });
  },
};
