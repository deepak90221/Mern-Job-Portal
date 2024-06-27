const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    
    email: { type: String, required: true },
    password: { type: String, required: true }, // Hashed password should be stored in production
    
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
