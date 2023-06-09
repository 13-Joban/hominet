const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course');
const Student  = require('./Student');

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
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  certificate: {
    type: DataTypes.STRING,
  },
  session: {
    type: DataTypes.STRING, // Change the data type to STRING
    defaultValue: 'Jan-June 2023', // Set the default value for the "session" field
    allowNull: false 
  },
});


Enrollment.belongsTo(Course, {
  foreignKey: 'courseId',
});

module.exports =  {Enrollment};
