"use strict";

var _fromUserId;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require("mongoose");

var connectionRequestSchema = new mongoose.Schema({
  fromUserId: (_fromUserId = {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }, _defineProperty(_fromUserId, "ref", "User"), _defineProperty(_fromUserId, "required", true), _fromUserId),
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    required: true,
    "enum": {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: "{VALUE} is incorrect status type"
    }
  }
}, {
  timestamps: true
}); // ConnectionRequest.find({fromUserId: 273478465864786587, toUserId: 273478465864786587})

connectionRequestSchema.index({
  fromUserId: 1,
  toUserId: 1
});
connectionRequestSchema.pre("save", function (next) {
  var connectionRequest = this; // Check if the fromUserId is same as toUserId

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }

  next();
});
var ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;
//# sourceMappingURL=connectionRequest.dev.js.map
