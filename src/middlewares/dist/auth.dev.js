"use strict";

var adminAuth = function adminAuth(req, res, next) {
  console.log("Admin auth is getting checked!!");
  var token = "xyz";
  var isAdminAuthorized = token === "xyz";

  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

var userAuth = function userAuth(req, res, next) {
  console.log("User auth is getting checked!!");
  var token = "xyz";
  var isAdminAuthorized = token === "xyz";

  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth: adminAuth,
  userAuth: userAuth
};
//# sourceMappingURL=auth.dev.js.map
