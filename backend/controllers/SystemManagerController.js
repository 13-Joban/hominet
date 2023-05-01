const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

const addStudent = async (req, res) => {
  try {
    const { crn, password } = req.body;
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = await Student.create({
      crn,
      password: hashedPassword,
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

module.exports = {
  addStudent,
};
