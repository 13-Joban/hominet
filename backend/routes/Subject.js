const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


const { isAuthenticated } = require('../controllers/StudentController');
const {
  getAllSubjects,
  enrollInSubject,
  getEnrolledSubjects,
  getSubjectByCode,
  uploadResult
} = require('../controllers/SubjectController'); // Import your Subject controller functions

// Define routes for subjects
router.post('/enrolledsubjects/:subjectCode/uploadResult', isAuthenticated,  upload.single('file'),  uploadResult); 
router.get('/enrolledsubjects', isAuthenticated, getEnrolledSubjects); 
router.get('/:subjectCode', getSubjectByCode); // Route to get all subjects
router.post('/enroll/:subjectCode', isAuthenticated, enrollInSubject);

router.get('/', getAllSubjects); // Route to get all subjects
 // Route to enroll in a subject
// Route to get enrolled subjects for a student

module.exports = router;
