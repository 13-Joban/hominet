const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Subject = require('./Subject');

const EnrollSubject = db.define('EnrolledSubjects', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'students',
      key: 'crn',
    },
  },
  subjectCode: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'subjects',
      key: 'subjectCode',
    },
  },
  enrolledDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  session: {
    type: DataTypes.STRING,
    defaultValue: 'Jan-June 2023',
    allowNull: false,
  },
  certificate: {
    type: DataTypes.STRING, // Add the new certificate column
  },
});

EnrollSubject.belongsTo(Subject, {
  foreignKey: 'subjectCode',
});

module.exports = { EnrollSubject };
