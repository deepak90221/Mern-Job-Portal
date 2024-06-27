const Admin = require('../models/admin-auth');

const adminreg = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;


        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields must be filled" });
        }

        const emailExist = await Admin.findOne({ email: email });
        if (emailExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }


        const usernameExist = await Admin.findOne({ username: username });
        if (usernameExist) {
            return res.status(400).json({ msg: "Username already exists" });
        }

        const adminCreated = await Admin.create({ username, email, phone, password /*hashedPassword*/ });

        res.status(200).json({ msg: adminCreated });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
};

const adminlog = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Received email and password:", email, password);

        const admin = await Admin.findOne({ email });



        console.log("Found admin:", admin);

        if (!admin ) {
            return res.status(400).json({ msg: "Invalid credentials" });
        } else {
           
            return res.status(200).json({ msg: "Login successful" });
        }

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { adminreg, adminlog };
