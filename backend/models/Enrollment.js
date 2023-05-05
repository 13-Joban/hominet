const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Enrollment = sequelize.define('EnrolledCourse', {
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
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id',
    },
  },
  enrolledDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  certificate: {
    type: DataTypes.BLOB,
  },
});

module.exports = {Enrollment};
