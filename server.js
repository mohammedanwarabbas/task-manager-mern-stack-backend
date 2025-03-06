const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const connectDB = require("./config/db.js")
const authRoutes = require("./routes/authRoutes.js")
const taskRoutes = require("./routes/taskRoutes.js")

connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

// Start the server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
