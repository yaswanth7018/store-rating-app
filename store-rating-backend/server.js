const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
console.log("Environment Variables:", process.env);

require("dotenv").config();

console.log("✅ Environment Variables Loaded:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS ? "****" : "Not Set"); // Hide password for security
console.log("DB_NAME:", process.env.DB_NAME);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Not Set");

if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing!");
    process.exit(1);  // Stop server if missing
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
