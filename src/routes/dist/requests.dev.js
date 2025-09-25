"use strict";

var express = require("express");

var requestRouter = express.Router();

var _require = require("../middlewares/auth"),
    userAuth = _require.userAuth;

var ConnectionRequest = require("../models/connectionRequest");

var User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, function _callee(req, res) {
  var fromUserId, toUserId, status, allowedStatus, toUser, existingConnectionRequest, connectionRequest, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          fromUserId = req.user._id;
          toUserId = req.params.toUserId;
          status = req.params.status;
          allowedStatus = ["ignored", "interested"];

          if (allowedStatus.includes(status)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Invalid status type: " + status
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

          return _context.abrupt("return", res.status(404).json({
            message: "User not found!"
          }));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(ConnectionRequest.findOne({
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
            message: "Connection Request Already Exists!!"
          }));

        case 17:
          connectionRequest = new ConnectionRequest({
            fromUserId: fromUserId,
            toUserId: toUserId,
            status: status
          });
          _context.next = 20;
          return regeneratorRuntime.awrap(connectionRequest.save());

        case 20:
          data = _context.sent;
          res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data: data
          });
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          res.status(400).send("ERROR: " + _context.t0.message);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 24]]);
});
requestRouter.post("/request/review/:status/:requestId", userAuth, function _callee2(req, res) {
  var loggedInUser, _req$params, status, requestId, allowedStatus, connectionRequest, data;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          loggedInUser = req.user;
          _req$params = req.params, status = _req$params.status, requestId = _req$params.requestId;
          allowedStatus = ["accepted", "rejected"];

          if (allowedStatus.includes(status)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            messaage: "Status not allowed!"
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
          }));

        case 8:
          connectionRequest = _context2.sent;

          if (connectionRequest) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "Connection request not found"
          }));

        case 11:
          connectionRequest.status = status;
          _context2.next = 14;
          return regeneratorRuntime.awrap(connectionRequest.save());

        case 14:
          data = _context2.sent;
          res.json({
            message: "Connection request " + status,
            data: data
          });
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send("ERROR: " + _context2.t0.message);

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
module.exports = requestRouter;
//# sourceMappingURL=requests.dev.js.map
