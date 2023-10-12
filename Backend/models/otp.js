const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    name: String,
    code: String,
    expireIn: Number,
  },
  {
    timestamps: true,
  }
);

let Otp = mongoose.model("otp", otpSchema, "otp");

module.exports = Otp;
