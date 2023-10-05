const mongoose = require("mongoose");

const JobSeekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Your  email address is required"],
    unique: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, "Your password is required"],
    trim: true,
  },
  qualification: {
    type: String,
    required: [true, "Your qualification is required"],
    trim: true,
  },
  file: {
    type: String,
    required: [true, "Your resume is required"],
  },
  profile: {
    type: String,
    required: [true, "Your profile is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const JobSeekerModel = mongoose.model("jobUser", JobSeekerSchema);

module.exports = JobSeekerModel;
