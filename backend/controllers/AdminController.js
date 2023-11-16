const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const Student = require('../models/Student')
const Course = require('../models/Course')
const Subject = require('../models/Subject')
const { Enrollment } = require('../models/Enrollment')
const { EnrollSubject } = require('../models/EnrollSubject')
const { Op } = require('sequelize');


exports.login = async (req, res) => {
  const { username, password } = req.body

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username })

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Generate and return JWT token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })

    res.status(200).json({ admin, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
}



exports.logout = async (req, res) => {
  try {
    // Optionally, you can perform additional actions before logging out, such as updating last logout timestamp, etc.
  
    // Clear the admin token cookie
    res.clearCookie('admin_token');
  
    res.status(200).json({ message: 'Admin logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}



exports.markComplete = async (req, res) => {
  try {
    const { studentId, courseId } = req.params

    // Check if the student exists
    const student = await Student.findOne(studentId)

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Check if the student is enrolled in the course
    const enrolledCourse = await Enrollment.findOne({
      student: studentId,
      course: courseId
    })

    if (!enrolledCourse) {
      return res
        .status(404)
        .json({ message: 'Course not found for this student' })
    }

    // Mark the course as completed
    enrolledCourse.isCompleted = true
    await enrolledCourse.save()

    res.status(200).json({ message: 'Enrolled course marked as completed' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// Middleware to check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' })
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const id = decoded.id
    const admin = await getadminById(id)
    req.admin = admin
    // console.log(req.admin)
    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: 'Unauthorized access' })
  }
}
const getadminById = async id => {
  try {
    const admin = await Admin.findOne({ where: { id } })
    return admin
  } catch (err) {
    console.error(err)
    throw new Error('Error in getting admin by id')
  }
}

exports.addNewCourse = async (req, res) => {
  try {
    const { id, name, institute, duration, nptelLink, session, type } = req.body

    // Create new course
    const newCourse = await Course.create({
      id,
      name,
      institute,
      duration,
      nptelLink,
      type,
      session
    })

    res.status(201).json({
      message: 'Course added successfully!',
      course: newCourse
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// update a course 
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId; // Get the courseId from the route parameter
    const {
      id,
      name,
      institute,
      duration,
      nptelLink,
      session,
      enrollmentEndDate,
      certificateSubmissionStartDate,
      certificateSubmissionEndDate
    } = req.body;

    // Find the course by its ID
    const course = await Course.findOne({ where: { id: courseId } });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update the course properties
    course.id = id;
    course.name = name;
    course.institute = institute;
    course.duration = duration;
    course.nptelLink = nptelLink;
    course.session = session;
    course.enrollmentEndDate = enrollmentEndDate;
    course.certificateSubmissionStartDate = certificateSubmissionStartDate;
    course.certificateSubmissionEndDate = certificateSubmissionEndDate;

    // Save the updated course
    await course.save();

    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.createCourseList = async (req, res) => {
  try {
    const coursesFromExcel = req.body.courses; // Assuming that the request body contains data from the Excel sheet
    console.log('coursesFromExcel', coursesFromExcel);

    // Create an array to store the newly created courses
    const newCourses = [];

    // Loop through the courses from Excel and transform them into objects that match your schema
    for (const courseFromExcel of coursesFromExcel) {
      const course = {
        id: courseFromExcel.id,
        name: courseFromExcel.name,
        institute: courseFromExcel.institute,
        duration: courseFromExcel.duration,
        nptelLink: courseFromExcel.nptelLink,
        session: courseFromExcel.session,
        enrollmentEndDate: courseFromExcel.enrollmentEndDate,
        // Map other fields as needed
        // ...
      };


      // Create a new Course object in the database
      const newCourse = await Course.create(course);
      newCourses.push(newCourse);
    }

    res.status(201).json({
      message: 'Courses added successfully!',
      courses: newCourses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// get enrolledStudents
exports.getEnrolledStudents = async (req, res) => {
  try {

    const { degreeType } = req.query;
    // Find all enrolled students with their course information
    const enrolledCourses = await Enrollment.findAll()

    // Create a Set to store unique studentIds
    const uniqueStudentIdsSet = new Set()

    // Iterate through the enrolledCourses array and add studentIds to the Set
    enrolledCourses.forEach(enrollment => {
      uniqueStudentIdsSet.add(enrollment.studentId)
    })

    // Convert the Set back to an array
    const uniqueStudentIds = Array.from(uniqueStudentIdsSet)

    const students = await Student.findAll({
      where: {
        crn: uniqueStudentIds, // Use the unique studentIds as the filter
        degreeType: degreeType, // Filter students based on the degreeType
      },
      attributes: ['urn', 'crn', 'name', 'contactNo', 'semester', 'branch'], // Include only the required attributes
    });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No enrolled students found' })
    }

    res.status(200).json(students)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// get student details 
exports.getStudentDetails = async (req, res) => {
  try {
    const { crn } = req.params;

    // Find the student by CRN
    const student = await Student.findOne({
      where: { crn },
      attributes: ['urn', 'crn', 'name', 'semester', 'branch', 'degreeType'],
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the enrolled MOOC courses for the student
    const enrolledMoocCourses = await Enrollment.findAll({
      where: { studentId: student.crn },
      include: {
        model: Course,
        attributes: ['id', 'name', 'session'],
      },
    });

    // Find the enrolled subjects for the student
    const enrolledSubjects = await EnrollSubject.findAll({
      where: { studentId: student.crn, subjectCode: { [Op.not]: null } },
      include: {
        model: Subject,
        attributes: ['subjectCode', 'subjectName', 'credits', 'session'],
      },
    });

    const studentDetails = {
      student,
      enrolledMoocCourses,
      enrolledSubjects,
    };

    res.status(200).json(studentDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// get enrolled courses for student by crn 
exports.getEnrolledCoursesByCRN = async (req, res) => {
  try {
    const { crn } = req.params;
    // console.log(crn)

    // Find the student by CRN
    const student = await getStudentByCrn(crn);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // console.log(student);

    // Find the enrolled courses for the student
    const enrolledCourses = await Enrollment.findAll({
      where: { studentId: student.crn },
      include: {
        model: Course,
      },
    });
    // console.log(enrolledCourses)

    res.json(enrolledCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
const getStudentByCrn = async (crn) => {
  try {
    const student = await Student.findOne({ where: { crn } });
    return student;
  } catch (err) {
    console.error(err);
    throw new Error('Error in getting student by CRN');
  }
};
exports.getCoursesByType = async (req, res) => {
  try {
    const courseType = req.params.type; // Get the type from the URL parameter
    const courses = await Course.findAll({
      where: {
        type: courseType, // Filter courses by type
      },
    });
    console.log(courses)
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

// for subjects 
exports.createSubject = async (req, res) => {
  try {
    const {
      subjectName,
      subjectCode,
      subjectType,
      credits,
      session,
    } = req.body;

    // Create a new subject
    const newSubject = await Subject.create({
      subjectName,
      subjectCode,
      subjectType,
      credits,
      session,
      isEnrolled: false, // You can set default values here
      isCompleted: false,
    });

    res.status(201).json({
      message: 'Subject added successfully!',
      subject: newSubject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a list of subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: 'No subjects found' });
    }

    res.status(200).json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const { subjectCode } = req.params;
    const subject = await Subject.findOne({ where: { subjectCode } });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a subject by ID
exports.updateSubject = async (req, res) => {
  try {
    const { subjectCode } = req.params;
    const {
      subjectName,
      subjectType,
      enrollmentEndDate,
      resultSubmissionStartDate,
      resultSubmissionEndDate
    } = req.body;

    // Find the subject by its ID
    const subject = await Subject.findOne({ where: { subjectCode } });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Update the subject properties
    subject.subjectName = subjectName;
    subject.subjectType = subjectType;
    subject.enrollmentEndDate = enrollmentEndDate;
    subject.resultSubmissionStartDate = resultSubmissionStartDate;
    subject.resultSubmissionEndDate = resultSubmissionEndDate;

    // Save the updated subject
    await subject.save();

    res.status(200).json({ message: 'Subject updated successfully', subject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

