const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },        // e.g. "1200 sq ft" or "5 marla"
    type: {
      type: String,
      enum: ["Residential", "Commercial", "Agricultural", "Industrial"],
      default: "Residential",
    },
    description: { type: String },
    images: [{ type: String }],                    // Cloudinary URLs
    status: {
      type: String,
      enum: ["Available", "Sold", "Reserved"],
      default: "Available",
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plot", plotSchema);
