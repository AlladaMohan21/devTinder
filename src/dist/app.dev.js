"use strict";

var express = require("express");

var app = express();
app.get("/user", function (req, res) {
  res.send({
    firstname: "allada",
    lastname: "Mohan"
  });
});
app.post("/user", function (req, res) {
  console.log("Save Data to the Database");
  res.send("data saved to the DATABASE");
});
app["delete"]("/user", function (req, res) {
  res.send("data Deleted Succesfully!!");
}); //this will handle all the http methods calls to /test

app.use("/test", function (req, res) {
  res.send("Allada Mohan ");
});
app.listen(7777, function () {
  console.log("server is ready to listen");
});
//# sourceMappingURL=app.dev.js.map
