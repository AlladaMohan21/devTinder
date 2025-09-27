"use strict";

var express = require("express");

var userRouter = express.Router();

var User = require("../models/user");

var _require = require("../middlewares/auth"),
    userAuth = _require.userAuth;

var ConnectionRequest = require("../models/connectionRequest");

var USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"; // Get all the pending connection request for the loggedIn user

userRouter.get("/user/requests/received", userAuth, function _callee(req, res) {
  var loggedInUser, connectionRequests;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          loggedInUser = req.user;
          _context.next = 4;
          return regeneratorRuntime.awrap(ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
          }).populate("fromUserId", USER_SAFE_DATA));

        case 4:
          connectionRequests = _context.sent;
          res.json({
            message: "Data fetched successfully",
            data: connectionRequests
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          req.statusCode(400).send("ERROR: " + _context.t0.message);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
userRouter.get("/user/connections", userAuth, function _callee2(req, res) {
  var loggedInUser, connectionRequests, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          loggedInUser = req.user;
          _context2.next = 4;
          return regeneratorRuntime.awrap(ConnectionRequest.find({
            $or: [{
              toUserId: loggedInUser._id,
              status: "accepted"
            }, {
              fromUserId: loggedInUser._id,
              status: "accepted"
            }]
          }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA));

        case 4:
          connectionRequests = _context2.sent;
          data = connectionRequests.map(function (row) {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
              return row.toUserId;
            }

            return row.fromUserId;
          });
          res.json({
            data: data
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send({
            message: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
userRouter.get("/feed", userAuth, function _callee3(req, res) {
  var loggedInUser, page, limit, skip, connectionRequests, hideUsersFromFeed, users;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          loggedInUser = req.user;
          page = parseInt(req.query.page) || 1;
          limit = parseInt(req.query.limit) || 10;
          limit = limit > 50 ? 50 : limit;
          skip = (page - 1) * limit;
          _context3.next = 8;
          return regeneratorRuntime.awrap(ConnectionRequest.find({
            $or: [{
              toUserId: loggedInUser._id
            }, {
              fromUserId: loggedInUser._id
            }]
          }).select("fromUserId toUserId"));

        case 8:
          connectionRequests = _context3.sent;
          hideUsersFromFeed = new Set();
          connectionRequests.forEach(function (req) {
            hideUsersFromFeed.add(req.fromUserId);
            hideUsersFromFeed.add(req.toUserId);
          });
          _context3.next = 13;
          return regeneratorRuntime.awrap(User.find({
            $and: [{
              _id: {
                $nin: Array.from(hideUsersFromFeed)
              }
            }, {
              _id: {
                $ne: loggedInUser._id
              }
            }]
          }).select(USER_SAFE_DATA).skip(skip).limit(limit));

        case 13:
          users = _context3.sent;
          res.json({
            data: users
          });
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send("ERROR" + _context3.t0.message);

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
});
module.exports = userRouter;
//# sourceMappingURL=user.dev.js.map
