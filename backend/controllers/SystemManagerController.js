const Student = require('../models/Student');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const addStudent = async (req, res) => {
  try {

    const { crn, password, name, contactNo, semester, branch, year, passing_out_year } = req.body;
    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newStudent = await Student.create({
      crn,
      password: hashedPassword,
      name, contactNo, semester, branch, year, passing_out_year
    });
    res.status(200).json({
      status: 'success',
      message: 'New student added to the database',
      data: {
        student: newStudent,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Unable to add student to the database',
    });
  }
};
const addAdmin = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
      name
    });
    res.status(200).json({
      status: 'success',
      message: 'New admin added to the database',
      data: {
        admin: newAdmin,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Unable to add admin to the database',
    });
  }
};

module.exports = {
  addStudent, addAdmin
};
