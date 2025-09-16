"use strict";

var express = require("express");

var app = express(); //app.use("/route", rH, [rH2, rH3], rH4, rh5);

app.get("/user", function (req, res, next) {
  console.log("Handling the route user!!");
  next();
}, function (req, res, next) {
  console.log("Handling the route user 2!!"); // res.send("2nd Response!!");

  next();
}, function (req, res, next) {
  console.log("Handling the route user 3!!"); // res.send("3rd Response!!");

  next();
}, function (req, res, next) {
  console.log("Handling the route user 4!!"); // res.send("4th Response!!");

  next();
}, function (req, res, next) {
  console.log("Handling the route user 5!!");
  res.send("5th Response!!");
});

var _require = require("./middlewares/auth"),
    adminAuth = _require.adminAuth,
    userAuth = _require.userAuth;

app.use("/admin", adminAuth);
app.post("/user/login", function (req, res) {
  res.send("User logged in successfully!");
});
app.get("/user/data", userAuth, function (req, res) {
  res.send("User Data Sent");
});
app.get("/admin/getAllData", function (req, res) {
  res.send("All Data Sent");
});
app.get("/admin/deleteUser", function (req, res) {
  res.send("Deleted a user");
});
app.listen(7777, function () {
  console.log("Server is successfully listening on port 7777...");
});
//# sourceMappingURL=app.dev.js.map
