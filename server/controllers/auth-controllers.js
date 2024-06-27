const User = require("../models/user-models");
//const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

      //  const saltRounds = 10; 
       // const hashedPassword = await bcrypt.hash(password, saltRounds);

       if (!username || !email || !phone || !password) {
        return res.status(400).json({ msg: "All fields must be filled" });
    }

        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(phone)) {
            return res.status(400).json({ msg: "Phone number must start with 6, 7, 8, or 9 and have exactly 10 digits" });
        }
        
        const phoneExist = await User.findOne({ phone: phone });
        if (phoneExist) {
            return res.status(400).json({ msg: "Phone number already exists" });
        }

       
        const usernameExist = await User.findOne({ username: username });
        if (usernameExist) {
            return res.status(400).json({ msg: "Username already exists" });
        }

        const userCreated = await User.create({ username, email, phone, password  /*hashedPassword*/ });

        res.status(200).json({ msg: userCreated });



    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
};


//login logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Received email and password:", email, password);

        const users = await User.findOne({ email });
        
        console.log("Found user:", users);

        
        
        if (!users) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        else{
            return res.status(200).json({msg:"Login successful" });
        }

       

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};



module.exports = {register,login};
