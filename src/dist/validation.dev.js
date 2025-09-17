"use strict";

var validator = require("validator");

var validationDatabase = function validationDatabase(req) {
  var _req$body = req.body,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      emailId = _req$body.emailId,
      password = _req$body.password;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email id is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("PASSWORD IS NOT STRONG");
  }
};

module.exports = {
  validationDatabase: validationDatabase
};
//# sourceMappingURL=validation.dev.js.map
