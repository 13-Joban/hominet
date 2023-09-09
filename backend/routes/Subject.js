const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../controllers/StudentController');
const {
  getAllSubjects,
  enrollInSubject,
  getEnrolledSubjects,
} = require('../controllers/SubjectController'); // Import your Subject controller functions

// Define routes for subjects
router.get('/', getAllSubjects); // Route to get all subjects
router.post('/enroll/:subjectId', isAuthenticated, enrollInSubject); // Route to enroll in a subject
router.get('/enrolledsubjects', isAuthenticated, getEnrolledSubjects); // Route to get enrolled subjects for a student

module.exports = router;
