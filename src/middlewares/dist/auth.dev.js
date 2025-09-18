"use strict";

var jwt = require("jsonwebtoken");

var User = require("../models/user");

var userAuth = function userAuth(req, res, next) {
  var token, decodedObj, _id, user;

  return regeneratorRuntime.async(function userAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.token;
          _context.prev = 1;

          if (token) {
            _context.next = 4;
            break;
          }

          throw new Error("Token not Found");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(jwt.verify(token, "DEV@Tinder$123"));

        case 6:
          decodedObj = _context.sent;
          _id = decodedObj._id;
          _context.next = 10;
          return regeneratorRuntime.awrap(User.findById(_id));

        case 10:
          user = _context.sent;

          if (user) {
            _context.next = 13;
            break;
          }

          throw new Error("user Not found");

        case 13:
          req.user = user;
          next();
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          res.status(400).send("ERROR" + _context.t0.message);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

module.exports = {
  userAuth: userAuth
};
//# sourceMappingURL=auth.dev.js.map
