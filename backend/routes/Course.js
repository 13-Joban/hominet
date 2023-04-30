const express = require('express');
const router = express.Router();

const courseController = require('../controllers/CourseController');

router.get('/courses', courseController.getAllCourses);

module.exports = router;
