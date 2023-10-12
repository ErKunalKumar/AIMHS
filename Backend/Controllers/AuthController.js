const User = require("../models/UserModel");
const JobSeekerModel = require("../models/JobSeekerModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const jobPostModel = require("../models/JobPost");
const employerModel = require("../models/Employer");
const salesModel = require("../models/SalesEnq");
const AdminModel = require("../models/Admin");
const Otp = require("../models/otp");

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

// Getting  data from mongoose(job posted by Admin)
module.exports.GetJobPost = async (req, res) => {
  jobPostModel
    .find({})
    .then((jobs) => res.json(jobs))
    .catch((err) => res.json(err));
};

// For employer registration

module.exports.Employer = async (req, res, next) => {
  try {
    const { company_name, mobile, email, username, password, createdAt } =
      req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Employer already exists" });
    }
    const employer = await employerModel.create({
      company_name,
      mobile,
      email,
      username,
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

// For  Admin Panel
module.exports.AdminPanel = async (req, res, next) => {
  try {
    const { name, mobile, email, password, createdAt } = req.body;
    const existingUser = await AdminModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Admin already exists" });
    }
    const admin = await AdminModel.create({
      name,
      email,
      mobile,
      password,
      createdAt,
    });
    const token = createSecretToken(admin._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "You have successfully signup",
      success: true,
      admin,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

// For Admin Login
module.exports.AdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, admin.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(admin._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", success: true, admin });
    next();
  } catch (error) {
    console.error(error);
  }
};

// Getting  data from mongoose(job applied by jobseeker)
module.exports.GetJobApplied = async (req, res) => {
  JobSeekerModel.find({})
    .then((jobs) => res.json(jobs))
    .catch((err) => res.json(err));
};

// Change Password/Reset Password
module.exports.emailSend = async (req, res) => {
  let data = await User.findOne({ email: req.body.email });
  const responseType = {};
  if (data) {
    let otpCode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpCode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    responseType.statusText = "Success";
    responseType.message = "Please Check Your Email Id";
  } else {
    responseType.statusText = "Error";
    responseType.message = "Email Id not exist";
  }
  res.status(200).json(responseType);
};

module.exports.changePassword = async (req, res) => {
  let data = await Otp.find({ email: req.body.email, code: req.body.otpCode });
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      response.message = "Token Expire";
      response.statusText = "Error";
    } else {
      let user = await User.findOne({ email: req.body.email });
      user.password = req.body.password;
      user.save();
      response.message = "Password changed Successfully";
      response.statusText = "Success";
    }
  } else {
    response.message = "Invalid Otp";
    response.statusText = "Error";
  }
  res.status(200).json(response);
};
