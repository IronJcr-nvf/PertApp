const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"], // Adjust to match frontend
    credentials: true,
  })
);

// Connect to the database
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,   // Database name from .env
  process.env.DB_USER,   // Database user from .env
  process.env.DB_PASSWORD, // Database password from .env
  {
    host: process.env.DB_HOST,  // Database host (localhost)
    dialect: "postgres",  // Database dialect
    port: process.env.DB_PORT,  // Database port from .env
  }
);

// Authenticate the connection to the database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL:", error);
  });

// API Routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/project", require("./routes/projectRoute"));
app.use("/api/task", require("./routes/taskRoute"));
app.use("/api/dependency", require("./routes/dependencyRoute"));

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
