const express = require('express');
const router = express.Router();

const studentController = require('../controllers/StudentController');

router.use('/login', studentController.login);
router.put('/update-sgpa', studentController.isAuthenticated,  studentController.updateSgpa);
router.use('/me', studentController.isAuthenticated, studentController.me );

module.exports = router;