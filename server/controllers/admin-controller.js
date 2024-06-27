const User = require("../models/user-models");
const Contact = require("../models/contact-model");
//const Job = require("../models/job-model");

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

/*
const deleteAllJobForms= async (req, res, next) => {
    try {
        const id = req.params.id;
        await Job.deleteOne({ _id: id });
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const getAllJobForms = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        console.log(jobs);
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ msg: "No users found" });
        }
        res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
};
*/




const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ msg: "No users found" });
        }
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

const usersData = async (req, res, next) => {
    try {
        const users = await User.find();
        console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({ msg: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};




module.exports = getAllContacts;
module.exports = usersData;
module.exports = deleteUserById;

//module.exports = deleteAllJobForms;

//module.exports = getAllJobForms;



