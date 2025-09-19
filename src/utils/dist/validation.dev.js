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

var validateEditProfileData = function validateEditProfileData(req) {
  var allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];
  var isEditAllowed = Object.keys(req.body).every(function (field) {
    return allowedEditFields.includes(field);
  });
  return isEditAllowed;
};

module.exports = {
  validationDatabase: validationDatabase,
  validateEditProfileData: validateEditProfileData
};
//# sourceMappingURL=validation.dev.js.map
