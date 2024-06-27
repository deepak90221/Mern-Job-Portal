const express = require('express');

const router = express.Router();

const JobApplications = require("../controllers/job-controllers");

router.post('/sendEmail', async (req, res) => {
    const { empid, email } = req.body;
    const subject = "Thank You for Contacting Us";
    const textMessage = `Your form has been submitted successfully. Your empid is ${empid}.`;

    try {
        const result = await sendEmail(subject, textMessage, email);
        if (result.success) {
            res.status(200).json({ message: 'Email sent successfully' });
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Failed to send email', error: error.message });
    }
});

router.route("/job").post(JobApplications);


module.exports = router;