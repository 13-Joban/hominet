const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../controllers/StudentController')
const courseController = require('../controllers/CourseController');
router.get('/enrolledcourses', isAuthenticated, courseController.getEnrolledCourses);
router.get('/', courseController.getAllCourses);
router.get('/:courseId',  courseController.getCourseById);
router.post('/enroll/:courseId', isAuthenticated,  courseController.enrollInCourse);



module.exports = router;
