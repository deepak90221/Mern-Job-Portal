require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (subject, textMessage, sent_to, sent_from = "kingdeepak010@gmail.com", reply_to) => {
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

${textMessage}

Best Regards,
K L Placements Office`,
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                min-height: 100vh;
                            }
                            .container {
                                background-color: #ffffff;
                                padding: 30px;
                                border-radius: 15px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                max-width: 600px;
                                width: 100%;
                            }
                            h1 {
                                color: #333;
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            p {
                                color: #555;
                                line-height: 1.6;
                                margin-bottom: 15px;
                            }
                            .highlight {
                                color: #007bff;
                                font-weight: bold;
                            }
                            .footer {
                                margin-top: 30px;
                                text-align: center;
                                color: #aaa;
                                font-size: 0.9rem;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                font-size: 16px;
                                color: #fff;
                                background-color: #007bff;
                                border-radius: 5px;
                                text-align: center;
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
                            .neon-text {
                                color: #007bff;
                                text-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                                animation: flicker 1.5s infinite alternate;
                            }
                            @keyframes flicker {
                                0% {
                                    opacity: 1;
                                }
                                100% {
                                    opacity: 0.7;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Welcome to K L Placements!</h1>
                            <p class="neon-text">Dear ${sent_to.split('@')[0]},</p>
                            <p>Thank you for applying for a position with us. We have received your application and our team will review it shortly.</p>
                            <p class="highlight">${textMessage}</p>
                            <p>We will get back to you with any updates regarding your application status.</p>
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

module.exports = sendEmail;
