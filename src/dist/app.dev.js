"use strict";

var express = require("express");

var connectDB = require("./config/database");

var app = express();

var cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

var authRouter = require("./routes/auth");

var profileRouter = require("./routes/profile");

var requestRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
connectDB().then(function () {
  console.log("Database connection established...");
  app.listen(7777, function () {
    console.log("Server is successfully listening on port 7777...");
  });
})["catch"](function (err) {
  console.error("Database cannot be connected!!");
});
//# sourceMappingURL=app.dev.js.map
