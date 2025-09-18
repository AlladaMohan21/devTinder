"use strict";

var express = require("express");

var connectDB = require("./config/database");

var app = express();

var User = require("./models/user");

var _require = require("./utils/validation"),
    validationDatabase = _require.validationDatabase;

var bcrypt = require("bcrypt");

var cookieParser = require("cookie-parser");

var jwt = require("jsonwebtoken");

var _require2 = require("./middlewares/auth"),
    userAuth = _require2.userAuth;

app.use(express.json());
app.use(cookieParser());
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
});
app.post("/login", function _callee2(req, res) {
  var _req$body2, emailId, password, user, isPasswordValid, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, emailId = _req$body2.emailId, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            emailId: emailId
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          throw new Error("Invalid Credentials");

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(user.validatePassword(password));

        case 9:
          isPasswordValid = _context2.sent;

          if (!isPasswordValid) {
            _context2.next = 18;
            break;
          }

          _context2.next = 13;
          return regeneratorRuntime.awrap(user.getJWT());

        case 13:
          token = _context2.sent;
          //add token to the cookie and send back the response
          res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000)
          });
          res.send("Login Successfull..");
          _context2.next = 19;
          break;

        case 18:
          throw new error("Invalid Credentials");

        case 19:
          _context2.next = 24;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](1);
          res.status(400).send("invalid Credentials " + _context2.t0.message);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 21]]);
});
app.get("/profile", userAuth, function _callee3(req, res) {
  var userId;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            userId = req.user;
            res.send(userId);
          } catch (err) {
            res.status(400).send("Something went wrong ");
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post("/sendConnectionRequest", userAuth, function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = req.user;
          res.send("connection Request Sent!");

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
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
