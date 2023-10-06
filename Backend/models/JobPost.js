const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  position: {
    type: String,
    required: [true, "Job position is required"],
    trim: true,
  },
  company_name: {
    type: String,
    required: [true, "Company is required"],
    unique: false,
    trim: true,
  },
  salary: {
    type: String,
    required: [true, "Salary is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Job location is required"],
    trim: true,
  },
  experience: {
    type: String,
    required: [true, "Job experence is required"],
    trim: true,
  },
  preference: {
    type: String,
    required: [false, "Write job preference"],
    trim: true,
  },
  job_type: {
    type: String,
    required: [false, "write job type"],
    trim: true,
  },
  qualification: {
    type: String,
    required: [true, "Your qualification is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const jobPostModel = mongoose.model("jobPost", jobPostSchema);

module.exports = jobPostModel;
