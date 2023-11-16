const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {isAuthenticated} = require('../controllers/StudentController')
const {uploadCertificate, getCourseById, enrollInCourse, getEnrolledCourses, getAllCourses} = require('../controllers/CourseController');
// Use the upload middleware in the route for uploading certificates
router.post('/enrolledcourses/:courseId/certificate', isAuthenticated, upload.single('file'), uploadCertificate);
router.get('/enrolledcourses', isAuthenticated, getEnrolledCourses);
router.get('/', isAuthenticated, getAllCourses);
router.get('/:courseId',  getCourseById);
router.post('/enroll/:courseId', isAuthenticated,  enrollInCourse);



module.exports = router;
