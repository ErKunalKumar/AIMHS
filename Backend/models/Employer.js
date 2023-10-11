const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employerSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, "Company name is required"],
    unique: false,
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, "Mobile no is required"],
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: false,
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: false,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

employerSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const employerModel = mongoose.model("employer", employerSchema);

module.exports = employerModel;
