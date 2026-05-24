const express = require("express");
const router = express.Router();
const {
  getPlots, getPlot, createPlot, updatePlot, deletePlot, getStats,
} = require("../controllers/plotController");
const { protect } = require("../middleware/auth");
const { upload } = require("../middleware/upload");// Public routes
router.get("/", getPlots);
router.get("/stats/summary", protect, getStats);
router.get("/:id", getPlot);

// Admin routes
router.post("/", protect, upload.array("images", 10), createPlot);
router.put("/:id", protect, upload.array("images", 10), updatePlot);
router.delete("/:id", protect, deletePlot);

module.exports = router;
