const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Admin = db.define('Admins', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Admin;
