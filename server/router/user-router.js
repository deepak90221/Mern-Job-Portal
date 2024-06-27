const express = require("express");
const router = express.Router();
const UsersData = require("../controllers/auth-controllers");


//contact form logic
router.route("/use").get(UsersData);

router.get("/use", (req, res) => {
    res.status(200).get("Users form page");
});



module.exports = router;
