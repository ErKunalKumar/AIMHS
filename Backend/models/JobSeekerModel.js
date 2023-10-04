const mongoose = require("mongoose");

const JobSeekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
  },
  email: {
    type: String,
    required: [true, "Your  email address is required"],
    unique: true,
  },
  mobile: {
    type: String,
    required: [true, "Your password is required"],
  },
  qualification: {
    type: String,
    required: [true, "Your qualification is required"],
  },
  resume: {
    type: String,
    required: [true, "Your resume is required"],
  },
  profile: {
    type: String,
    required: [true, "Your profile is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const JobSeekerModel = mongoose.model("jobUser", JobSeekerSchema);

module.exports = JobSeekerModel;
