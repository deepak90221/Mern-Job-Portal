const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
    try {
        const response = req.body;

        const existingContact = await Contact.findOne({
            $or: [
                { username: response.username },
                { message: response.message }
            ]
        });

        if (existingContact) {
            return res.status(400).json({ msg: "Contact with this username, email, or message already exists" });
        }

        await Contact.create(response);

        return res.status(200).json({ msg: "Message sent successfully" });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Message not sent" });
    }
};

module.exports = contactForm;
