const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [false, "Last name is optional"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
    trim: true,
  },
  company_name: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  company_size: {
    type: String,
    required: [false, "Company size is optional"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const salesModel = mongoose.model("salesenquiry", salesSchema);

module.exports = salesModel;
