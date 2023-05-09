const express = require('express');
const router = express.Router();
const  Course  = require('../models/Course');
const { login, isAuthenticated, addNewCourse } = require('../controllers/AdminController')

router.post('/login', login )
router.post('/courses/add', isAuthenticated, addNewCourse )

module.exports = router;
