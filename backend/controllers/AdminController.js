const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate and return JWT token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({ admin,  token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.markComplete = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    // Check if the student exists
    const student = await Student.findOne(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the student is enrolled in the course
    const enrolledCourse = await Enrollment.findOne({ student: studentId, course: courseId });

    if (!enrolledCourse) {
      return res.status(404).json({ message: 'Course not found for this student' });
    }

    // Mark the course as completed
    enrolledCourse.isCompleted = true;
    await enrolledCourse.save();

    res.status(200).json({ message: 'Enrolled course marked as completed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Middleware to check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const admin = await getadminById(id);
    req.admin = admin;
    console.log(req.admin);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized access' });
  }
};
const getadminById = async (id) => {
    try {
      const admin = await Admin.findOne({ where: { id } });
      return admin;
    } catch (err) {
      console.error(err);
      throw new Error('Error in getting admin by id');
    }
};

exports.addNewCourse = async (req, res) => {
  try {
    const { id, name, institute, duration, nptelLink, session } = req.body;

    // Create new course
    const newCourse = await Course.create({
      id,
      name,
      institute,
      duration,
      nptelLink,
      session,
    });

    res.status(201).json({
      message: 'Course added successfully!',
      course: newCourse,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}