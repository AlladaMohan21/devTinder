"use strict";

var mongoose = require("mongoose");

var connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: String,
    required: true,
    "enum": {
      values: ["ignore", "interested", "accepted", "rejected"],
      message: "{VALUE} is not a valid status"
    }
  }
}, {
  timestamps: true
});
connectionRequestSchema.index({
  fromUserId: 1,
  toUserId: 1
});
connectionRequestSchema.pre("save", function () {
  var connectionRequest = this;

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send Connection request to yourself");
  }

  next();
});
var ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;
//# sourceMappingURL=connectionRequest.dev.js.map
