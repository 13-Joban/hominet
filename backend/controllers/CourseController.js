const Course = require('../models/Course');
const {Enrollment} = require('../models/Enrollment');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId.split(':')[1];
    // console.log(req.user);
    const studentId = req.user.crn;
    console.log(courseId);
    const course = await findCourseById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const now = new Date();
    if (now > course.enrollmentEndDate) {
      return res.status(400).json({ message: 'Enrollment has closed' });
    }

    const existingEnrollment = await Enrollment.findOne({
      where: {
        courseId,
        studentId,
      },
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: 'You have already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      courseId,
      studentId,
    });

    res.json(enrollment);
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

const findCourseById  = async (courseId) => {
  try {
  
    const course = await Course.findOne({courseId: courseId});
    return course
  } catch (err) {
    console.error(err);
    // res.status(500).json({ message: 'Server Error' });
    
  }
}

