const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

exports.login = async (req, res) => {
  try {
    const { crn, password } = req.body;

    // Check if the student exists in the database
    const student = await Student.findOne({ where: { crn } });

    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, student.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ crn: student.crn }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Store the token in a cookie with HttpOnly and Secure flags
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Middleware to check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  // Get the token from the cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const crn  = decoded.crn ;
    const student = await getStudentByCrn(crn);
    req.user  = student;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized access' });
  }
};
const getStudentByCrn = async (crn) => {
    try {
      const student = await Student.findOne({ where: { crn } });
      return student;
    } catch (err) {
      console.error(err);
      throw new Error('Error in getting student by CRN');
    }
};
  
