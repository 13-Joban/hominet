const express = require('express');
const router = express.Router();
const { login, isAuthenticated, addNewCourse, getEnrolledStudents, createCourseList, getStudentDetails, getCoursesByType, updateCourse , createSubject, updateSubject, getSubjects, getSubjectById, logout} = require('../controllers/AdminController');

router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.post('/courses/add', isAuthenticated, addNewCourse);
router.put('/courses/update/:courseId', isAuthenticated, updateCourse); // Add the update route here
router.post('/courses/addList', isAuthenticated, createCourseList);
router.get('/getEnrolledStudents', isAuthenticated, getEnrolledStudents);
router.get('/students/:crn/getStudentDetails', isAuthenticated, getStudentDetails);
router.get('/courses/type/:type', isAuthenticated, getCoursesByType);


// Define routes for subjects
router.post('/subjects/add', isAuthenticated,   createSubject);
router.put('/subjects/update/:subjectCode', isAuthenticated,  updateSubject);
router.get('/subjects',isAuthenticated,  getSubjects);
router.get('/subjects/:subjectCode', isAuthenticated,  getSubjectById);

module.exports = router;
