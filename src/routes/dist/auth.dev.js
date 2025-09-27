"use strict";

var express = require("express");

var authRouter = express.Router();

var _require = require("../utils/validation"),
    validationDatabase = _require.validationDatabase;

var bcrypt = require("bcrypt");

var User = require("../models/user");

authRouter.post("/signup", function _callee(req, res) {
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
authRouter.post("/login", function _callee2(req, res) {
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
          res.send(user);
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
authRouter.post("/logout", function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            res.cookie("token", "", {
              expires: new Date(Date.now())
            });
            res.status(200).send("Logout successful");
          } catch (err) {
            res.status(400).send("logout failed");
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = authRouter;
//# sourceMappingURL=auth.dev.js.map
