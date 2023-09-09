const Subject = require('../models/Subject');
const EnrollSubject = require('../models/EnrollSubject');

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
    const subjectId = req.params.subjectId;
    const studentId = req.user.crn; // Assuming you have authentication middleware

    const subject = await findSubjectById(subjectId);

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
        subjectId,
        studentId,
      },
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: 'You are already enrolled in this subject' });
    }

    const enrollment = await EnrollSubject.create({
      subjectId,
      studentId,
    });

    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Function to get all enrolled subjects for a student
exports.getEnrolledSubjects = async (req, res) => {
  try {
    const studentId = req.user.crn; // Assuming you have authentication middleware
    const enrolledSubjects = await EnrollSubject.findAll({
      where: {
        studentId,
      },
      include: {
        model: Subject,
      },
    });

    res.json(enrolledSubjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Helper function to find a subject by ID
const findSubjectById = async (subjectId) => {
  try {
    const subject = await Subject.findOne({ where: { id: subjectId } });
    return subject;
  } catch (err) {
    console.error(err);
    return null;
  }
};
