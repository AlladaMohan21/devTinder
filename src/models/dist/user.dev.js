"use strict";

var mongoose = require("mongoose");

var validator = require("validator");

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

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
    "enum": {
      values: ["male", "female", "others"],
      message: "{VALUE is not a valid gender type}"
    } // validate(value) {
    //   if (!["male", "female", "others"].includes(value)) {
    //     throw new Error("Gender data is not valid");
    //   }
    // },

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

userSchema.methods.getJWT = function _callee() {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = this;
          _context.next = 3;
          return regeneratorRuntime.awrap(jwt.sign({
            _id: user._id
          }, "DEV@Tinder$123", {
            expiresIn: "1d"
          }));

        case 3:
          token = _context.sent;
          return _context.abrupt("return", token);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

userSchema.methods.validatePassword = function _callee2(passwordInputUser) {
  var user, passwordHash, isPasswordValid;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this;
          passwordHash = user.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(bcrypt.compare(passwordInputUser, passwordHash));

        case 4:
          isPasswordValid = _context2.sent;
          return _context2.abrupt("return", isPasswordValid);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

var User = mongoose.model("user", userSchema);
module.exports = User;
//# sourceMappingURL=user.dev.js.map
