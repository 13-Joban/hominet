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
});

module.exports = Course;
