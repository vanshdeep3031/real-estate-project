const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, trim: true },
    interestedPlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plot",
    },
    budget: { type: String },
    notes: { type: String },
    status: {
      type: String,
      enum: ["New", "Interested", "Negotiating", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
