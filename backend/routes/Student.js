const express = require('express');
const router = express.Router();

const studentController = require('../controllers/StudentController');

router.use('/login', studentController.login);
router.use('/me', studentController.isAuthenticated);

module.exports = router;