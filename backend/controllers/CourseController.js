const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getCourseById  = async (req, res) => {
  try {
    
    const {courseId} = req.params
    const course = await Course.findOne({courseId: courseId});
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
    
  }
}
