require('dotenv').config();
const nodemailer = require('nodemailer');

const sendMail = async (subject, textMessage, sent_to, sent_from = "kingdeepak010@gmail.com", reply_to) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const options = {
            from: {
                name: "K L Placements Office",
                address: sent_from,
            },
            to: sent_to,
            replyTo: reply_to,
            subject: subject,
            text: `Welcome to our Portal!

Dear ${sent_to.split('@')[0]},

Thank you for your interest in our portal. ${textMessage}

Best Regards,
K L Placements Office`,
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f9f9f9;
                                margin: 0;
                                padding: 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                min-height: 100vh;
                            }
                            .container {
                                background-color: #fff;
                                padding: 20px;
                                border-radius: 10px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                max-width: 600px;
                                width: 100%;
                                text-align: center;
                            }
                            h1 {
                                color: #333;
                                margin-bottom: 20px;
                            }
                            p {
                                color: #555;
                                line-height: 1.5;
                                margin-bottom: 20px;
                            }
                            .highlight {
                                color: #007bff;
                                font-weight: bold;
                            }
                            .footer {
                                margin-top: 20px;
                                color: #aaa;
                                font-size: 0.8rem;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                font-size: 16px;
                                color: #fff;
                                background-color: #007bff;
                                border-radius: 5px;
                                text-decoration: none;
                                margin-top: 20px;
                                transition: background-color 0.3s;
                            }
                            .button:hover {
                                background-color: #0056b3;
                            }
                            .contact-info {
                                margin-top: 20px;
                                font-size: 0.9rem;
                                color: #666;
                            }
                            .contact-info p {
                                margin: 5px 0;
                            }
                            .apply-link {
                                text-decoration: none;
                                color: #007bff;
                                font-weight: bold;
                            }
                            .apply-link:hover {
                                text-decoration: underline;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Welcome to Our Portal!</h1>
                            <p>Dear ${sent_to.split('@')[0]},</p>
                            <p>Thank you for your interest in our portal. We appreciate you applying for a position with us.</p>
                            <p class="highlight">${textMessage}</p>
                            <p>We have received your application and our team will review it shortly. We will get back to you with any updates regarding your application status.</p>
                            <a href="#" class="button">Apply Now!</a>
                            <div class="contact-info">
                                <p>Contact Us: +91 9398176161</p>
                                <p>Office Address: Shuravarapetha, near Naga Bhushana Kirana Stores, Khammam</p>
                                <p>Pin Code: 507001</p>
                                <p>Best Regards,</p>
                                <p>K L Placements Office</p>
                                <p><strong>Note:</strong> Do not reply to this message.</p>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This email was sent from K L Placements Office.</p>
                        </div>
                    </body>
                </html>
            `,
        };

        const info = await transporter.sendMail(options);
        console.log("Message sent: %s", info.messageId);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: error.message || "Failed to send email" };
    }
};

module.exports = sendMail;
