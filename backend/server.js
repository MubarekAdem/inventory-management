const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/Items");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const { authenticateJWT } = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI =
  "mongodb+srv://inventoryDB:12345@cluster0.qnkphxn.mongodb.net/inventoryDB?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use the imported routes with JWT authentication where needed
app.use("/api/items", authenticateJWT, itemRoutes);
app.use("/api/auth", authRoutes); // No authentication needed for sign-up/sign-in
app.use("/api/categories", authenticateJWT, categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
