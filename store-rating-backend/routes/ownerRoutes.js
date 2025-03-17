const express = require("express");
const { addStore, getStores } = require("../controllers/ownerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/stores", authMiddleware, addStore);
router.get("/stores", authMiddleware, getStores);

module.exports = router;
