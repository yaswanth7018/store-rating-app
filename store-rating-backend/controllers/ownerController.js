const db = require("../config/db");

exports.addStore = async (req, res) => {
    try {
        const { name } = req.body;
        const ownerId = req.user.id; // Assuming owner is logged in

        await db.query("INSERT INTO stores (name, ownerId) VALUES (?, ?)", [name, ownerId]);

        res.status(201).json({ message: "Store added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding store" });
    }
};

exports.getStores = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const [stores] = await db.query("SELECT * FROM stores WHERE ownerId = ?", [ownerId]);

        res.status(200).json(stores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching stores" });
    }
};
