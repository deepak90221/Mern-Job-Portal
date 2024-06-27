const User = require("../models/user-models");

const Usersdata = async (req, res) => {
    try {
      const user = await User.find();
      console.log(user); 
      if (!user || user.length === 0) {
        return res.status(404).json({ msg: "No contacts found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

module.exports = Usersdata;