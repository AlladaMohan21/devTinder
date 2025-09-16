"use strict";

var express = require("express");

var app = express();
app.use("/hello", function (req, res) {
  res.send("hello hello helo");
});
app.use("/", function (req, res) {
  res.send("Hello from the  ");
});
app.use("/test", function (req, res) {
  res.send("Hello from the server");
});
app.listen(7777, function () {
  console.log("server is ready to listen");
});
//# sourceMappingURL=app.dev.js.map
