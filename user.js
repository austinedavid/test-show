const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
