"use strict";

var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema((_ref = {
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
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
    "default": "https://geographyandyou.com/images/user-profile.png"
  },
  about: {
    type: String,
    "default": "This is a default about of the user!"
  },
  skills: {
    type: [String]
  }
}, _defineProperty(_ref, "lastName", {
  type: String
}), _defineProperty(_ref, "emailId", {
  type: String
}), _defineProperty(_ref, "password", {
  type: String
}), _defineProperty(_ref, "age", {
  type: Number
}), _defineProperty(_ref, "gender", {
  type: String
}), _ref), {
  timestamps: true
});
var User = mongoose.model("user", userSchema);
module.exports = User;
//# sourceMappingURL=user.dev.js.map
