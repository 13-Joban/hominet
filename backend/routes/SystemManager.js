const express = require('express');
const router = express.Router();
const { addStudent , addAdmin} = require('../controllers/SystemManagerController');

router.post('/addStudent', addStudent);
router.post('/addAdmin', addAdmin);

module.exports = router;
