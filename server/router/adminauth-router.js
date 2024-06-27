const express = require('express');
const router = express.Router();

const AdminAuthController = require("../controllers/adminauth-controller");


router.route('/adminlog').get(AdminAuthController.adminlog);

router.route('./adminreg').get(AdminAuthController.adminreg);

module.exports = router;