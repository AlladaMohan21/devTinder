"use strict";

var express = require("express");

var profileRouter = express.Router();

var _require = require("../middlewares/auth"),
    userAuth = _require.userAuth;

var _require2 = require("../utils/validation"),
    validateEditProfileData = _require2.validateEditProfileData;

profileRouter.get("/profile/view", userAuth, function _callee(req, res) {
  var userId;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            userId = req.user;
            res.send(userId);
          } catch (err) {
            res.status(400).send("Something went wrong ");
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
profileRouter.patch("/profile/edit", userAuth, function _callee2(req, res) {
  var loggedInUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (validateEditProfileData(req)) {
            _context2.next = 3;
            break;
          }

          throw new Error("invalid Edit Request");

        case 3:
          loggedInUser = req.user;
          Object.keys(req.body).forEach(function (key) {
            return loggedInUser[key] = req.body[key];
          });
          _context2.next = 7;
          return regeneratorRuntime.awrap(loggedInUser.save());

        case 7:
          res.json({
            message: "".concat(loggedInUser.firstName, ",Your profile updated successfully"),
            data: loggedInUser
          });
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send("ERROR: " + _context2.t0.message);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = profileRouter;
//# sourceMappingURL=profile.dev.js.map
