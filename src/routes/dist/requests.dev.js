"use strict";

var express = require("express");

var requestRouter = express.Router();

var _require = require("../middlewares/auth"),
    userAuth = _require.userAuth;

var ConnectionRequestModel = require("../models/connectionRequest");

var User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, function _callee(req, res) {
  var fromUserId, toUserId, status, allowedstatus, toUser, existingConnectionRequest, connectionRequest, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          fromUserId = req.user._id;
          toUserId = req.params.toUserId;
          status = req.params.status;
          allowedstatus = ["ignored", "interested"];

          if (allowedstatus.includes(status)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Invalid status type"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(User.findById(toUserId));

        case 9:
          toUser = _context.sent;

          if (toUser) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "User Not Found"
          }));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(ConnectionRequestModel.findOne({
            $or: [{
              fromUserId: fromUserId,
              toUserId: toUserId
            }, {
              fromUserId: toUserId,
              toUserId: fromUserId
            }]
          }));

        case 14:
          existingConnectionRequest = _context.sent;

          if (!existingConnectionRequest) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            message: "Connection Request already Exists"
          }));

        case 17:
          connectionRequest = new ConnectionRequestModel({
            fromUserId: fromUserId,
            toUserId: toUserId,
            status: status
          });
          _context.next = 20;
          return regeneratorRuntime.awrap(connectionRequest.save());

        case 20:
          data = _context.sent;
          res.json({
            message: "connection Request Sent!",
            data: data
          });
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          console.error("Connection request error:", _context.t0);
          res.status(400).send("Connection failed: " + _context.t0.message);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 24]]);
});
module.exports = requestRouter;
//# sourceMappingURL=requests.dev.js.map
