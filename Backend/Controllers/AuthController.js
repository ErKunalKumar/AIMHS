const User = require("../models/UserModel");
const JobSeekerModel = require("../models/JobSeekerModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

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
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

// For Login

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

// For JobSeeker apply the job

module.exports.Register = async (req, res, next) => {
  try {
    const { name, email, mobile, qualification, file, profile, createdAt } =
      req.body;
    const existUser = await JobSeekerModel.findOne({ email });
    if (existUser) {
      return res.json({ message: "You have already applied for the post" });
    }
    const user = await JobSeekerModel.create({
      name,
      email,
      mobile,
      qualification,
      file,
      profile,
      createdAt,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "You have successfully applied ", success: true, user });
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
  }
};
