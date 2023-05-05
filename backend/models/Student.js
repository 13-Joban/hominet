const { DataTypes } = require('sequelize');
const db = require('../config/database');
const {Enrollment} = require('./Enrollment');
// const bcrypt = require('bcryptjs');

const Student = db.define('Students', {
  crn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  contactNo: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  branch: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  passing_out_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sgpa1st: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa2nd: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa3rd: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa4th: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa5th: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa6th: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa7th: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa8th: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  // hooks: {
  //   beforeCreate: async (student) => {
  //     const salt = await bcrypt.genSalt(10);
  //     student.password = await bcrypt.hash(student.password, salt);
  //   },
  // },
  defaultScope: {
    include: [{
      model: Enrollment,
      as: 'enrolledCourses',
    }, ],
  },
  scopes: {
    withPassword: {
      attributes: {},
    },
  },
});

// Add the association
Student.hasMany(Enrollment, {
  foreignKey: 'studentId',
  as: 'enrolledCourses',
});

module.exports = Student;
