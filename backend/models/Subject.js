const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Subject = db.define('Subject', {
  subjectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subjectCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  subjectType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  session: {
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
  enrollmentEndDate: {
    type: DataTypes.DATE,
    defaultValue: '2024-05-20',
  },
  resultSubmissionStartDate: {
    type: DataTypes.DATE,
    defaultValue: '2024-07-12',
  },
  resultSubmissionEndDate: {
    type: DataTypes.DATE,
    defaultValue: '2024-07-19',
  },
});

module.exports = Subject;
