const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../controllers/StudentController')
const courseController = require('../controllers/CourseController');

router.get('/', courseController.getAllCourses);
router.get('/:courseId', courseController.getCourseById);
router.post('/enroll/:courseId', isAuthenticated,  courseController.enrollInCourse);
router.post('/enrolledcourses', isAuthenticated,  courseController.getEnrolledCourses);

module.exports = router;
