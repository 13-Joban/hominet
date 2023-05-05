const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Course = db.define('Course', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institute: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nptelLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isEnrolled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  enrollmentEndDate: {
    type: DataTypes.DATE,
    defaultValue: '2023-05-20'
    // allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'closed'),
    defaultValue: 'draft'
  }
});
// Course.sync();

module.exports = Course;
