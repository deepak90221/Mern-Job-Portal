const sendEmail = require('./sendEmail');

const adminMail = async (subject, textMessage, sent_to) => {
    try {
        const sent_from = "your_admin_email@example.com"; // Update this with your admin email
        const reply_to = "reply_to@example.com"; // Update this with the reply-to email if needed

        // HTML content for the email
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${subject}</title>
                <style>
                    /* Your CSS styles here */
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome to K L Placements!</h1>
                    <p>Dear Admin,</p>
                    <p>${textMessage}</p>
                    <p>We will get back to you with any updates regarding your application status.</p>
                    <div class="contact-info">
                        <p>Contact Us: +91 9398176161</p>
                        <p>Office Address: Shuravarapetha, near Naga Bhushana Kirana Stores, Khammam</p>
                        <p>Pin Code: 507001</p>
                        <p>Best Regards,</p>
                        <p>K L Placements Office</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Call the sendEmail function with appropriate parameters
        const result = await sendEmail(subject, htmlContent, sent_to, sent_from, reply_to);
        return result;
    } catch (error) {
        console.error("Error sending admin email:", error);
        return { success: false, message: error.message || "Failed to send admin email" };
    }
};

module.exports = adminMail;
