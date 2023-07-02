'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Add the defaultScope to include the virtual "session" field
      await queryInterface.addIndex('EnrolledCourses', {
        fields: ['courseId'],
        name: 'enrolled_courses_course_id_idx',
        transaction,
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex('EnrolledCourses', 'enrolled_courses_course_id_idx', { transaction });
    });
  }
};
