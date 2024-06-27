// controllers/profileController.js
const Profile = require('../models/profile-model');

// Create a new profile
const createProfile = async (req, res) => {
    try {
        const {  email, password} = req.body;
        const newProfile = new Profile({
            
            email,
            password, // In production, hash the password before saving
            
        });
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Failed to create profile' });
    }
};

// Get profile by ID
const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

// Update profile by ID
const updateProfile = async (req, res) => {
    try {
        const { username, email, fullName, bio, avatarUrl } = req.body;
        const updatedProfile = await Profile.findByIdAndUpdate(
            req.params.id,
            { username, email, fullName, bio, avatarUrl, updatedAt: Date.now() },
            { new: true } // Return the updated document
        );
        if (!updatedProfile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

// Delete profile by ID


module.exports = {createProfile, updateProfile, getProfileById}