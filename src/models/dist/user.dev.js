"use strict";

var mongoose = require("mongoose");

var validator = require("validator");

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
    trim: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  emailId: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email" + value);
      }
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    validate: function validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Your password is weak.." + value);
      }
    }
  },
  age: {
    type: Number,
    min: 18
  },
  gender: {
    type: String,
    validate: function validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    }
  },
  photoUrl: {
    type: String,
    "default": "https://geographyandyou.com/images/user-profile.png",
    validate: function validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid url" + value);
      }
    }
  },
  about: {
    type: String,
    "default": "This is a default about of the user!",
    maxlength: [200, "About section cannot exceed 200 characters"]
  },
  skills: {
    type: [String]
  }
}, {
  timestamps: true
});
var User = mongoose.model("user", userSchema);
module.exports = User;
//# sourceMappingURL=user.dev.js.map
