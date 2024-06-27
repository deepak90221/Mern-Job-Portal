const { Schema, model, default: mongoose } = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  programmingLanguage: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  }
 
});

const Job = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = Job;
