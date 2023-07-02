const Course = require('../models/Course');
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
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    // console.log(req.user);
    const studentId = req.user.crn;
    // console.log(courseId);
    const course = await findCourseById(courseId);

    console.log('couresController', course);

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

    console.log('enrollment' , enrollment);

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
    const enrolledCourses = await Enrollment.findAll({
      where: {
        studentId,
      },
      include: {
        model: Course,
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
    const enrollment = await Enrollment.findOne({ where: { courseId , studentId} });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (!req.file || req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    console.log('req file', req.file)
    console.log('req file', req.file.mimetype)
    console.log('req.file.path:', req.file && req.file.path);

    // Create a new drive instance with the obtained access token
    const drive = google.drive({ version: 'v3', auth: auth })
    console.log('drive ', drive)

    const fileMetadata = {
      name: req.file.originalname,
      mimeType: req.file.mimetype,
      parents: ['1trv19bk3mkYPy__qaqf68ffTsYGjTpnA'], // Replace 'folderId' with the actual folder ID in your Google Drive where you want to store the certificates
    };
    console.log('metadata file', fileMetadata)

    const media = {
      mimeType: req.file.mimetype,
      body: Readable.from(req.file.buffer), // Provide the file data as a readable stream
    };
    console.log('media file', media)

    const uploadedFile = await drive.files.create({
      resource: fileMetadata,
      media: media, // Pass the media object containing the stream to the API
      fields: 'id, webContentLink',
    });

    console.log('uploaded file', uploadedFile)

    const certificateFile = {
      name: req.file.originalname,
      link: uploadedFile.data.webContentLink,
    };
    // console.log('enrollment1 ', enrollment);

    enrollment.certificate = certificateFile.link;
    enrollment.isCompleted = true;
    
    await enrollment.save();

    // console.log('enrollment2 ', enrollment);
    res.json(enrollment);
  } catch (err) {

    console.error(err);
    res.status(500).json({ message: 'Server Error' });
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


