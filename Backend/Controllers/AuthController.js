const User = require("../models/UserModel");
const JobSeekerModel = require("../models/JobSeekerModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const jobPostModel = require("../models/JobPost");
const employerModel = require("../models/Employer");
const salesModel = require("../models/SalesEnq");

// For signup to login the portal

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signup in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

// For  JobSeeker Login

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

// For job post

module.exports.JobPost = async (req, res, next) => {
  try {
    const {
      position,
      company_name,
      salary,
      location,
      experience,
      preference,
      job_type,
      qualification,
      description,
      createdAt,
    } = req.body;
    // const existUser = await JobSeekerModel.findOne({ email });
    // if (existUser) {
    //   return res.json({ message: "You have already applied for the post" });
    // }
    const jobPost = await jobPostModel.create({
      position,
      company_name,
      salary,
      location,
      experience,
      preference,
      job_type,
      qualification,
      description,
      createdAt,
    });
    const token = createSecretToken(jobPost._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "You have successfully posted the job ",
      success: true,
      jobPost,
    });
    console.log(jobPost);
    next();
  } catch (error) {
    console.log(error);
  }
};

// Getting data from mongoose
module.exports.GetJobPost = async (req, res) => {
  jobPostModel
    .find({})
    .then((jobs) => res.json(jobs))
    .catch((err) => res.json(err));
};

// For employer registration

module.exports.Employer = async (req, res, next) => {
  try {
    const { company_name, mobile, email, password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Employer already exists" });
    }
    const employer = await employerModel.create({
      company_name,
      mobile,
      email,
      password,
      createdAt,
    });
    const token = createSecretToken(employer._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "You have successfully signup",
      success: true,
      employer,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

// For Employer Login

module.exports.EmployerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const employer = await employerModel.findOne({ email });
    if (!employer) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, employer.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(employer._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({
      message: "Employer logged in successfully",
      success: true,
      employer,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

// For Sales Enquiry Form

module.exports.SalesEnquiry = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      mobile,
      company_name,
      company_size,
      message,
      createdAt,
    } = req.body;
    // const existingUser = await salesModel.findOne({ email });
    // if (existingUser) {
    //   return res.json({ message: "Employer already exists" });
    // }
    const sales = await salesModel.create({
      first_name,
      last_name,
      email,
      mobile,
      company_name,
      company_size,
      message,
      createdAt,
    });
    const token = createSecretToken(sales._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "Your sales enquiry successfully submitted ",
      success: true,
      sales,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};
