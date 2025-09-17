"use strict";

var express = require("express");

var _require = require("./config/database"),
    connectDb = _require.connectDb;

var User = require("./models/user");

var app = express();
app.post("/signup", function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = new User({
            firstname: "amrutha",
            lastName: "roshni",
            emailId: "amrutha21@gmail.com",
            password: "1432",
            gender: "female"
          });
          _context.next = 4;
          return regeneratorRuntime.awrap(user.save());

        case 4:
          res.send("data added successfully");
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).send("Error Saving data" + _context.t0.message);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
connectDb().then(function () {
  console.log("Database Connection Established!");
  app.listen(7777, function () {
    console.log("Server is successfully listening on port 7777...");
  });
})["catch"](function (err) {
  console.error("Database Cannot be connected");
});
//# sourceMappingURL=app.dev.js.map
