"use strict";

var express = require("express");

var _require = require("./config/database"),
    connectDb = _require.connectDb;

var User = require("./models/user");

var app = express();
app.use(express.json());
app.get("/user", function _callee(req, res) {
  var userEmail, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userEmail = req.body.emailId;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.find({
            emailId: userEmail
          }));

        case 4:
          user = _context.sent;

          if (user.length === 0) {
            res.status(400).send("user data not found");
          } else {
            res.send(user);
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(400).send("user data not found");

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.get("/feed", function _callee2(req, res) {
  var users, userdata;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          users = req.body;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.find({}));

        case 4:
          userdata = _context2.sent;
          res.send(userdata);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send("No users left");

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.get("/id", function _callee3(req, res) {
  var userId, users;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.body.userId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 4:
          users = _context3.sent;
          res.send(users);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send("user data not found");

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app["delete"]("/user", function _callee4(req, res) {
  var user, users;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          user = req.body.userId;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(user));

        case 4:
          users = _context4.sent;
          res.send("deleted Successfully");
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(400).send("error");

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.patch("/user", function _callee5(req, res) {
  var userId, data, users;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.body.userId;
          data = req.body;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, data, {
            returnDocument: "after"
          }));

        case 5:
          users = _context5.sent;
          res.send("Data updated Successfully");
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](2);
          res.status(400).send("Something went wrong");

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
app.post("/signup", function _callee6(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user = new User(req.body);
          _context6.next = 4;
          return regeneratorRuntime.awrap(user.save());

        case 4:
          res.send("data added successfully");
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(400).send("Error Saving data" + _context6.t0.message);

        case 10:
        case "end":
          return _context6.stop();
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
