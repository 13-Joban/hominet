'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Courses', 'type', {
      type: Sequelize.ENUM('M', 'H'),
      allowNull: false,
      defaultValue: 'M',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Courses', 'type');
  },
};
