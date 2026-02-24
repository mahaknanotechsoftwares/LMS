const Certificate = require('../models/Certificate');
const Enrollment = require('../models/Enrollment');

async function issueCertificate(studentId, courseId) {
  // Ensure course is completed
  const enrollment = await Enrollment.findOne({ student: studentId, course: courseId });
  if (!enrollment || !enrollment.completed) {
    throw new Error('Course not completed yet');
  }

  // Generate certificate
  const certificate = new Certificate({ student: studentId, course: courseId });
  await certificate.save();

  return certificate;
}

module.exports = { issueCertificate };