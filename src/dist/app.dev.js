"use strict";

var express = require("express");

var app = express();
app.get("/user/:userId/:name/:password", function (req, res) {
  console.log(req.params);
  res.send({
    firstName: "Akshay",
    lastName: "Saini"
  });
}); //app.use("/route", rH, [rH2, rH3], rH4, rh5);

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
app.listen(7777, function () {
  console.log("Server is successfully listening on port 7777...");
});
//# sourceMappingURL=app.dev.js.map
