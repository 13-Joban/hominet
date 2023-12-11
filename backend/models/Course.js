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
  description: {
    type: DataTypes.TEXT,
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
    defaultValue: '2024-05-20',
  },
  certificateSubmissionStartDate: {
    type: DataTypes.DATE,
    defaultValue: '2024-07-12'
  },
  certificateSubmissionEndDate: {
    type: DataTypes.DATE,
    defaultValue: '2024-07-19'
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'closed'),
    defaultValue: 'published',
  },
  type: {
    type: DataTypes.ENUM('M', 'H'),
    allowNull: false,
    defaultValue: 'M',
  },
});

module.exports = Course;





