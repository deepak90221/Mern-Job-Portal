const Job = require('../models/job-model');

const getAllJobApplications = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        console.log(jobs); 
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ msg: "No job applications found" });
        }
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error); // Log any caught errors
        next(error); // Pass error to Express error handler
    }
};

const deleteJobApplication = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job application not found' });
        }
        res.json({ message: 'Job application removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const acceptJobApplication = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job application not found' });
        }
        job.status = 'Accepted';
        await job.save();
        res.json({ message: 'Job application accepted', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const rejectJobApplication = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job application not found' });
        }
        job.status = 'Rejected';
        await job.save();
        res.json({ message: 'Job application rejected', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllJobApplications,
    deleteJobApplication,
    acceptJobApplication,
    rejectJobApplication
};
