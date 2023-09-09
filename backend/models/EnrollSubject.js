const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Subject = require('./Subject');
// const Student = require('./Student');

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
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'subjects',
      key: 'id',
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
});

EnrollSubject.belongsTo(Subject, {
  foreignKey: 'subjectId',
});

module.exports = {EnrollSubject};
