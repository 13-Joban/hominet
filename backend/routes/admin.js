const express = require('express');
const router = express.Router();
const  Course  = require('../models/Course');
const { login} = require('../controllers/AdminController')

router.post('/courses/add', async (req, res) => {

  try {
    const { id, name, institute, duration, nptelLink, session } = req.body;

    // Create new course
    const newCourse = await Course.create({
      id,
      name,
      institute,
      duration,
      nptelLink,
      session,
    });

    res.status(201).json({
      message: 'Course added successfully!',
      course: newCourse,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.post('/login', login )

module.exports = router;
