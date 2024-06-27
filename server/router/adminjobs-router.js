const express = require('express');
const { 
    getAllJobApplications, 
    deleteJobApplication, 
    acceptJobApplication,
    rejectJobApplication // Add this line to include the reject function
} = require('../controllers/adminjobs-controller');
const router = express.Router();

router.get('/job', getAllJobApplications);

router.route('/job/delete/:id').delete(deleteJobApplication);
//router.delete('/job/:id', deleteJobApplication);


router.put('/job/:id/accept', acceptJobApplication);
//router.route("/user/delete/:id").delete(deleteUserById);


router.put('/job/:id/reject', rejectJobApplication); 

module.exports = router;
