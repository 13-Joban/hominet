const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Course = require('../models/Course');

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

    res.status(200).json({ user: student, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.me = async (req, res) => {
  const student = req.user;
  res.json(student)

}
// Middleware to check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const crn = decoded.crn;
    const student = await getStudentByCrn(crn);

    // console.log('student is logged in ', student)
    req.user = student;
    // console.log(req.user);
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

exports.updateSgpa = async (req, res) => {
  try {
    const { crn, sgpa } = req.body;

    // Find the student by CRN
    const student = await Student.findOne({ where: { crn } });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update SGPA fields
    await student.update(sgpa);

    res.status(200).json({ message: 'SGPA updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
  
// exports.getEnrolledCoursesByCRN = async (req, res) => {
//   try {
//     const { crn } = req.params;

//     // Find the student by CRN
//     const student = await getStudentByCrn(crn);

//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     // Find the enrolled courses for the student
//     const enrolledCourses = await Enrollment.findAll({
//       where: { studentId: student.id },
//       include: {
//         model: Course,
//       },
//     });

//     res.json(enrolledCourses);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };