const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, default: "Pending" },
    date: { type: String },
    time: { type: String },
    category: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("list", listSchema);
