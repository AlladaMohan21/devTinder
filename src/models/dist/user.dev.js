"use strict";

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  firstname: {
    type: String
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String
  },
  password: {
    type: String
  },
  age: {
    type: Number
  },
  gender: {
    type: String
  }
});
var User = mongoose.model("user", userSchema);
module.exports = User;
//# sourceMappingURL=user.dev.js.map
