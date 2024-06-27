const Job = require('../models/job-model');
const sendEmail = require('../utils/sendEmail');

const handleJobApplication = async (req, res) => {
  const { firstname, lastname, email, phone, programmingLanguage, experience } = req.body;

  // Check if required fields are missing
  if (!firstname || !lastname || !email || !phone || !programmingLanguage || !experience) {
    return res.status(400).json({ message: "Missing required fields in application." });
  }

  // Validate phone number
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number. It must start with a digit between 6 and 9 and be 10 digits long." });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    // Check for duplicate application
    const existingApplication = await Job.findOne({
      firstname,
      lastname,
      email,
      phone,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Duplicate job application detected." });
    }

    // Create new job application
    const newJobApplication = new Job({
      firstname,
      lastname,
      email,
      phone,
      programmingLanguage,
      experience,
    });

    const savedApplication = await newJobApplication.save();

    // Send confirmation email
    const subject = "Thank You for Your Job Application";
    const textMessage = `Dear ${firstname},\n\nThank you for your job application. We have received your application successfully.`;

    const emailResult = await sendEmail(subject, textMessage, email);
    if (!emailResult.success) {
      throw new Error(emailResult.message);
    }

    // Respond with success
    res.status(201).json({
      message: 'Job application submitted and email sent successfully',
      application: savedApplication,
    });
  } catch (error) {
    // Handle errors
    console.error('Error saving job application:', error);
    res.status(500).json({ message: 'Error saving job application', error: error.message });
  }
};

module.exports = handleJobApplication;
