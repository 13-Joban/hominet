const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Student = db.define('Students', {
    crn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  module.exports = Student