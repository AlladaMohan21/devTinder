"use strict";

var express = require("express");

var connectDB = require("./config/database");

var app = express();

var User = require("./models/user");

var _require = require("./utils/validation"),
    validationDatabase = _require.validationDatabase;

var bcrypt = require("bcrypt");

app.use(express.json());
app.post("/signup", function _callee(req, res) {
  var _req$body, firstName, lastName, emailId, password, existingUser, validatePass, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //validate user 
          validationDatabase(req); //encrypt password

          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, emailId = _req$body.emailId, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            emailId: emailId
          }));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Email already exists"));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 9:
          validatePass = _context.sent;
          console.log(validatePass); //   Creating a new instance of the User model

          user = new User({
            firstName: firstName,
            lastName: lastName,
            password: validatePass,
            emailId: emailId
          });
          _context.prev = 12;
          _context.next = 15;
          return regeneratorRuntime.awrap(user.save());

        case 15:
          runValidators = true;
          res.send("User Added successfully!");
          _context.next = 24;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](12);

          if (!(_context.t0.code === 11000)) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Email already exists"));

        case 23:
          res.status(400).send("Error saving user: " + _context.t0.message);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[12, 19]]);
}); // Get user by email

app.get("/user", function _callee2(req, res) {
  var userEmail, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userEmail = req.body.emailId;
          _context2.prev = 1;
          console.log(userEmail);
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            emailId: userEmail
          }));

        case 5:
          user = _context2.sent;

          if (!user) {
            res.status(404).send("User not found");
          } else {
            res.send(user);
          } // const users = await User.find({ emailId: userEmail });
          // if (users.length === 0) {
          //   res.status(404).send("User not found");
          // } else {
          //   res.send(users);
          // }


          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          res.status(400).send("Something went wrong ");

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // Feed API - GET /feed - get all the users from the database

app.get("/feed", function _callee3(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.find({}));

        case 3:
          users = _context3.sent;
          res.send(users);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send("Something went wrong ");

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Detele a user from the database

app["delete"]("/user", function _callee4(req, res) {
  var userId, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = req.body.userId;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findByIdAndDelete({
            _id: userId
          }));

        case 4:
          user = _context4.sent;
          //const user = await User.findByIdAndDelete(userId);
          res.send("User deleted successfully");
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          res.status(400).send("Something went wrong ");

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Update data of the user

app.patch("/user/:userId", function _callee5(req, res) {
  var userId, data, ALLOWED_UPDATES, isUpdateAllowed, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.params.userId;
          data = req.body;
          _context5.prev = 2;
          ALLOWED_UPDATES = ["photoUrl", "about", "gender", "skills"];
          isUpdateAllowed = Object.keys(data).every(function (k) {
            return ALLOWED_UPDATES.includes(k);
          });

          if (isUpdateAllowed) {
            _context5.next = 7;
            break;
          }

          throw new Error("Updates not allowed");

        case 7:
          if (!(data.skills.length > 10)) {
            _context5.next = 9;
            break;
          }

          throw new Error("skills cannot be more than 10");

        case 9:
          _context5.next = 11;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate({
            _id: userId
          }, data, {
            returnDocument: "after",
            runValidators: true
          }));

        case 11:
          user = _context5.sent;
          console.log(user);
          res.send("User updated successfully");
          _context5.next = 19;
          break;

        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](2);
          res.status(400).send("UPDATE FAILED:" + _context5.t0.message);

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 16]]);
});
connectDB().then(function () {
  console.log("Database connection established...");
  app.listen(7777, function () {
    console.log("Server is successfully listening on port 7777...");
  });
})["catch"](function (err) {
  console.error("Database cannot be connected!!");
});
//# sourceMappingURL=app.dev.js.map
