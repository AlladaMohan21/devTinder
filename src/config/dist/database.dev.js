"use strict";

var mongoose = require("mongoose");

var connectDb = function connectDb() {
  return regeneratorRuntime.async(function connectDb$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect("mongodb+srv://alladamohan:%40Mohan123@namastedev.zdkk2yu.mongodb.net/devTinder"));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = connectDb;
//# sourceMappingURL=database.dev.js.map
