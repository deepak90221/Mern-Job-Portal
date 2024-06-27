const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

// Route to handle user registration
router.post("/register", validate(signupSchema), authControllers.register);

// Route to handle user login
router.post("/login", authControllers.login);

// Route to handle sending emails
router.post('/sendMail', async (req, res) => {
    const { empid, email } = req.body;
    const subject = "Thank You for Contacting Us";
    const textMessage = `Your form has been submitted successfully. Your empid is ${empid}.`;

    try {
        const result = await sendMail(subject, textMessage, email);
        if (result.success) {
            res.status(200).json({ message: 'Email sent successfully' });
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Failed to send email', error: error.message });
    }
});

// General endpoint for the base route
router.get("/", (req, res) => {
    res.status(200).send("Welcome to the API!");
});

module.exports = router;
