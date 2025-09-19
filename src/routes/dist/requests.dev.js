"use strict";

var express = require("express");

var requestRouter = express.Router();

var _require = require("../middlewares/auth"),
    userAuth = _require.userAuth;

requestRouter.post("/sendConnectionRequest", userAuth, function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = req.user;
          res.send("connection Request Sent!");

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = requestRouter;
//# sourceMappingURL=requests.dev.js.map
