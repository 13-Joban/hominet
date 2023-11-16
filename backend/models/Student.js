const { DataTypes } = require('sequelize');
const db = require('../config/database');
const {Enrollment} = require('./Enrollment');

const Student = db.define('Students', {
  crn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  urn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  degreeType: {
    type: DataTypes.STRING(50), // You can adjust the length as needed
    allowNull: false, // Change to false if it's required
  },
  sgpa1: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa2: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa3: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa4: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa5: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa6: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa7: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  sgpa8: {
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

module.exports =  Student ;
