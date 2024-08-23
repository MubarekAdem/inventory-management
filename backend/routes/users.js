const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to verify the JWT and get the user ID
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied.");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token.");
    req.user = user;
    next();
  });
};

// Route to get the user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById("66c626995f903dde1f23708a").select(
      "-password"
    ); // Exclude password
    if (!user) return res.status(404).send("User not found.");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error.");
  }
});

module.exports = router;
