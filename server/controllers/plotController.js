const Plot = require("../models/Plot");
const { cloudinary } = require("../middleware/upload");

exports.getPlots = async (req, res) => {
  try {
    const { status, type, search, featured } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (featured) filter.featured = featured === "true";
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }
    const plots = await Plot.find(filter).sort({ createdAt: -1 });
    res.json(plots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlot = async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) return res.status(404).json({ message: "Plot not found" });
    res.json(plot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPlot = async (req, res) => {
  try {
    const images = req.files ? req.files.map((f) => f.path) : [];
    const plot = await Plot.create({ ...req.body, images });
    res.status(201).json(plot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePlot = async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) return res.status(404).json({ message: "Plot not found" });
    const newImages = req.files ? req.files.map((f) => f.path) : [];
    const keepImages = req.body.keepImages ? JSON.parse(req.body.keepImages) : plot.images;
    const updated = await Plot.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: [...keepImages, ...newImages] },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePlot = async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) return res.status(404).json({ message: "Plot not found" });
    for (const imgUrl of plot.images) {
      const publicId = imgUrl.split("/").slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }
    await plot.deleteOne();
    res.json({ message: "Plot deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const total = await Plot.countDocuments();
    const available = await Plot.countDocuments({ status: "Available" });
    const sold = await Plot.countDocuments({ status: "Sold" });
    const reserved = await Plot.countDocuments({ status: "Reserved" });
    res.json({ total, available, sold, reserved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
