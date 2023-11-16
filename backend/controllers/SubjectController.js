const Subject = require('../models/Subject');
const Student = require('../models/Student');
const {EnrollSubject} = require('../models/EnrollSubject');
const auth = require('../googledrive')
const { google } = require('googleapis');
const { Readable } = require('stream');

// Function to get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to enroll in a subject
exports.enrollInSubject = async (req, res) => {
  try {
    const subjectCode = req.params.subjectCode;
    const studentId = req.user.crn; // Assuming you have authentication middleware

    const subject = await findSubjectByCode(subjectCode);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Check if the enrollment is closed or if the student is already enrolled
    const now = new Date();
    if (now > subject.enrollmentEndDate) {
      return res.status(400).json({ message: 'Enrollment has closed' });
    }

    const existingEnrollment = await EnrollSubject.findOne({
      where: {
        subjectCode,
        studentId,
      },
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: 'You are already enrolled in this subject' });
    }

    const enrollment = await EnrollSubject.create({
      subjectCode,
      studentId,
    });

    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Helper function to find a subject by ID
exports.getSubjectByCode = async (req, res) => {
  try {
    const subjectCode = req.params.subjectCode;
    const subject = await Subject.findOne({ where: {subjectCode:  subjectCode } });
    res.json(subject);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getEnrolledSubjects = async (req, res) => {
  try {
    const studentId = req.user.crn;
    const student = await getStudentById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch enrolled subjects with details
    const enrolledSubjects = await EnrollSubject.findAll({
      where: { studentId },
      include: {
        model: Subject
      }, // Include Subject model to get details of each subject
    });

    res.json(enrolledSubjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findSubjectByCode  = async (subjectCode) => {
  try {
  
    const subject = await Subject.findOne({ where: { subjectCode: subjectCode } });
    return subject
  } catch (err) {
    console.error(err);
    return null
    // res.status(500).json({ message: 'Server Error' });
    
  }
}

const getStudentById = async (studentId) => {
  try {
    // Assuming you have a model for students (e.g., Student)
    const student = await Student.findOne({ where: { crn: studentId } });
    return student;
  } catch (err) {
    console.error(err);
  }
};

exports.uploadResult = async (req, res) => {
  try {
    const subjectCode = req.params.subjectCode;
    const studentId = req.user.crn;
    const studentUrn = req.user.urn;
    const degreeType = req.user.degreeType;

    // Find the subject by code
    const subject = await Subject.findOne({ where: { subjectCode } });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Check if the enrollment is closed or if the student is not enrolled
    const now = new Date();
    if (now > subject.enrollmentEndDate) {
      return res.status(400).json({ message: 'Enrollment has closed' });
    }

    const enrollment = await EnrollSubject.findOne({
      where: {
        subjectCode,
        studentId,
      },
    });

    if (!enrollment) {
      return res.status(400).json({ message: 'You are not enrolled in this subject' });
    }

    console.log(req.file)

    if (!req.file || req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    // Determine filename and folder based on degreeType
    let fileName, folderId;
    if (degreeType === 'Minor') {
      fileName = `minor_classroomsubject_${subjectCode}_${studentUrn}.pdf`;
      folderId = '1w_bEG7KvsDEEVqKAehf9pM779X2eisH9'; // Minor folder ID
    } else if (degreeType === 'Honours') {
      fileName = `honours_classroomsubject_${subjectCode}_${studentUrn}.pdf`;
      folderId = '1JXPYBQxhZWwuVX4TEQ8BridKqY9F2QPA'; // Honours folder ID
    } else {
      // Handle other cases or provide a default
      return res.status(400).json({ message: 'Invalid degreeType' });
    }

    // Create a new drive instance with the obtained access token
    const drive = google.drive({ version: 'v3', auth });

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
