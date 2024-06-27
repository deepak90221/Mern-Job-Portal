const express = require('express');
const router = express.Router();
const {createProfile, getProfileById, updateProfile} = require('../controllers/profile-controller');

router.post('/profile', createProfile);

router.get('/profile/:id', getProfileById);

router.put('/profile/:id', updateProfile);


module.exports = router;
