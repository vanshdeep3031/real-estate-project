const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Please provide email and password" });
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });
    res.json({
      token: generateToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.setup = async (req, res) => {
  try {
    const existing = await Admin.findOne({});
    if (existing)
      return res.status(400).json({ message: "Admin already exists" });
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL || "admin@realestate.com",
      password: process.env.ADMIN_PASSWORD || "Admin@123",
      name: "Admin",
    });
    res.status(201).json({ message: "Admin created successfully", email: admin.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
