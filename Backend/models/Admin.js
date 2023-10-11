const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Your username is required"],
  },
  mobile: {
    type: String,
    required: [true, "Your mobile number is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

adminSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = AdminModel;
