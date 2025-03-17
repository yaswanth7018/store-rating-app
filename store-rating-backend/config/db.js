require("dotenv").config();
const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});

db.authenticate()
    .then(() => console.log("✅ Database Connected"))
    .catch((err) => console.error("❌ Database Connection Failed:", err));

module.exports = db;
