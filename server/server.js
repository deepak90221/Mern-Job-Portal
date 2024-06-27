const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./utils/db");
const { register, login } = require("./controllers/auth-controllers");
const contactForm = require("./controllers/contact-controller");
const getAllContacts = require("./controllers/admin-controller");
const {getAllJobApplications} = require("./controllers/adminjobs-controller");
const JobApplicationsRouterData = require("./router/adminjobs-router");
const usersData = require("./controllers/user-controller");
const JobApplications = require("./controllers/job-controllers");
const JobRouter = require("./router/job-router");
const adminRoute = require("./router/admin-router");
const {adminlog, adminreg} = require("./controllers/adminauth-controller");

const adminJobsRouter = require('./router/adminjobs-router'); // Import the admin jobs router


//service-syntax:
//const { getAllServices, addService }= require("./controllers/service-controller");
const serviceRoutes = require("./router/service-router");
//const paymentRouter  = require("./router/payment-router");
//profile:
const profileRoutes = require('./router/profile-router');



//const { createOrder , verifyPayment} = require("./controllers/payment-controller");


const AdminauthRouter = require("./router/adminauth-router");
const sendMail = require('./utils/sendMail');
const sendEmail = require('./utils/sendEmail');

const sendotp = require('./utils/sendotp');
const useotp = require('./models/userotp');
const genotp = require('./utils/generateotp');


app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend URL
}));

app.use(express.json());



// Route to handle sending OTP
app.post('/api/auth/sendotp', async (req, res) => {
    const { semail } = req.body;
    const aotp = genotp();

    try {
        await useotp.create({ email: semail, otp: aotp, createdAt: Date.now() });
        const sent_to = semail;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = semail;
        const rotp = aotp;
        await sendotp(rotp, sent_to, sent_from, reply_to);
        res.status(200).json({ success: true, message: "OTP Email sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Route to handle OTP verification
app.post('/api/auth/verifyotp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await useotp.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const storedOtp = user.otp;

        if (otp === storedOtp) {
            // OTP is correct
            await useotp.deleteOne({ email });
            return res.status(200).json({ success: true, message: "OTP verification successful" });
        } else {
            // Incorrect OTP
            return res.status(400).json({ error: "Incorrect OTP" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to handle sending emails
app.post('/api/auth/sendMail', async (req, res) => {
    const { email, message, subject } = req.body;

    try {
        const sent_to = email;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = email;
        const mailsubject = subject;
        const textMessage = message;

        if (!email) {
            throw new Error('Email is required');
        }

        // Send the email
        await sendMail(mailsubject, textMessage, sent_to, sent_from, reply_to);

        res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Route to handle sending another type of emails
app.post('/api/auth/sendEmail', async (req, res) => {
    const { email, message, subject } = req.body;

    try {
        const sent_to = email;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = email;
        const mailsubject = subject;
        const textMessage = message;

        if (!email) {
            throw new Error('Email is required');
        }

        // Send the email
        await sendEmail(mailsubject, textMessage, sent_to, sent_from, reply_to);

        res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Define other routes
app.use("/api/auth/register", register);
app.use("/api/auth/login", login);
app.use("/api/auth/contact", contactForm);
app.use("/api/auth/contacts", getAllContacts);

app.use('/api', adminJobsRouter); // Use /jobs instead of /job for the routes
app.use("/api/auth/job", getAllJobApplications);
app.use('/api', JobApplicationsRouterData);

//,acceptJobApplication,deleteJobApplication,rejectJobApplication



app.use("/api/auth/user", usersData);
app.use("/api/admin", adminRoute);
app.use("/api/auth/job", JobApplications);
app.use("/api/job", JobRouter);


app.use("/api/auth/adminlog", adminlog);

app.use("/api/auth/adminreg", adminreg);


app.use("./api/auth/sendotp", sendotp);

app.use("./api/auth/genotp", genotp);

app.use('/api', AdminauthRouter);

//service:

//{ getAllServices, addService }
//app.use("./api/auth/getAllServices", getAllServices);
//app.use("./api/auth/addService", addService);

app.use('/api', serviceRoutes);

app.use('/api/profile', profileRoutes);


//app.use("./api/auth/order", createOrder);


//app.use("./api/auth/verify", verifyPayment);

//app.use('/api/payment', paymentRouter);




app.get("/", (req, res) => {
    res.status(200).send("Welcome to learning MERN stack");
});

const PORT = 8000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    });
});
