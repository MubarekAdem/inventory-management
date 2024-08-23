const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust path as necessary

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id }, // Include user ID in token payload
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expiration time
  );
};

// Example sign-in function
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !isValidPassword(password, user.password)) {
      // You should hash passwords
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signIn };
