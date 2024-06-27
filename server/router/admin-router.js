const express = require("express");
const getAllContacts = require("../controllers/admin-controller");
const usersData = require("../controllers/admin-controller");

const deleteUserById = require("../controllers/admin-controller");
const getUserById = require("../controllers/admin-controller");

const deleteAllJobForms = require("../controllers/admin-controller");


const router = express.Router();

router.route("/users").get(getAllContacts);

router.route("/contact").get(usersData);

router.route("/user/delete/:id").delete(deleteUserById);

router.route("/job/delete/:id").delete(deleteAllJobForms);



router.route("/user/:id").get(getUserById);



module.exports = router;