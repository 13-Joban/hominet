const Course = require('../models/Course');
const Student = require('../models/Student');
const {Enrollment} = require('../models/Enrollment');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const auth = require('../googledrive')
const multer = require('multer');
const { Readable } = require('stream');


exports.getAllCourses = async (req, res) => {
  try {
    const studentId = req.user.crn;
    const student = await getStudentById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    let courses;

    if (student.degreeType === 'Minor') {
      courses = await Course.findAll({ where: { type: 'M' } });
    } else if (student.degreeType === 'Honours') {
      courses = await Course.findAll({ where: { type: 'H' } });
    } else {
      // Handle other cases or provide a default
      return res.status(400).json({ message: 'Invalid degreeType' });
    }

    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};



exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log(req.user);
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
    })

    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getCourseById  = async (req, res) => {
  try {
    
    const courseId = req.params.courseId
    const course = await Course.findOne({ where: { id: courseId } });
    // console.log(course);
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
    
  }
}

const findCourseById  = async (courseId) => {
  try {
  
    const course = await Course.findOne({ where: { id: courseId } });
    return course
  } catch (err) {
    console.error(err);
    // res.status(500).json({ message: 'Server Error' });
    
  }
}
exports.getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user.crn;
    const student = await getStudentById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const enrolledCourses = await Enrollment.findAll({
      where: {
        studentId,
      },
      include: {
        model: Course,
        where: {
          type: student.degreeType === 'Minor' ? 'M' : 'H',
        },
      },
    });

    res.json(enrolledCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
exports.uploadCertificate = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const studentId = req.user.crn;
    const studentUrn = req.user.urn;
    const degreeType = req.user.degreeType; // Assuming you have 'degreeType' in your user object
    const enrollment = await Enrollment.findOne({ where: { courseId, studentId } });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (!req.file || req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    // Determine filename and folder based on degreeType
    let fileName, folderId;
    if (degreeType === 'Minor') {
      fileName = `minor_mooc_${courseId}_${studentUrn}.pdf`;
      folderId = '1y0EHpX95Hw8dFVwUAygfu-NO0CvLwgy3'; // Minor folder ID
    } else if (degreeType === 'Honours') {
      fileName = `honours_mooc_${courseId}_${studentUrn}.pdf`;
      folderId = '1JXPYBQxhZWwuVX4TEQ8BridKqY9F2QPA'; // Honours folder ID
    } else {
      // Handle other cases or provide a default
      return res.status(400).json({ message: 'Invalid degreeType' });
    }

    // Create a new drive instance with the obtained access token
    const drive = google.drive({ version: 'v3', auth: auth });

    const fileMetadata = {
      name: fileName,
      parents: [folderId], // Use the folder ID based on the degreeType
    };

    const media = {
      mimeType: 'application/pdf', // Set the MIME type for PDF files
      body: Readable.from(req.file.buffer), // Provide the file data as a readable stream
    };

    const uploadedFile = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webContentLink',
    });

    const certificateFile = {
      name: fileName,
      link: uploadedFile.data.webContentLink,
    };

    enrollment.certificate = certificateFile.link;
    enrollment.isCompleted = true;

    await enrollment.save();

    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getStudentById = async (studentId) => {
  try {
    // Assuming you have a model for students (e.g., Student)
    const student = await Student.findOne({ where: { crn: studentId } });
    return student;
  } catch (err) {
    console.error(err);
  }
};

// }


 // try {
  //   const courseId = req.params.courseId;
  //   const enrollment = await Enrollment.findOne({ where: { courseId } });

  //   if (!enrollment) {
  //     return res.status(404).json({ message: 'Enrollment not found' });
  //   }

  //   // if (!req.file || req.file.mimetype !== 'application/pdf') {
  //   //   return res.status(400).json({ message: 'Please upload a PDF file' });
  //   // }

  //   console.log(req.file);

  //   enrollment.certificate = req.file.name;
  //   enrollment.isCompleted = true;
  //   await enrollment.save();

  //   res.json(enrollment);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: 'Server Error' });
  // }


