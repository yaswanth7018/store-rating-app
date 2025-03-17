import { useEffect, useState } from "react";
import { getStores, addStore } from "../../services/api";

const OwnerDashboard = () => {
    const [stores, setStores] = useState([]);
    const [storeName, setStoreName] = useState("");

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const res = await getStores();
            setStores(res.data);
        } catch (error) {
            console.error("Error fetching stores:", error);
        }
    };

    const handleAddStore = async (e) => {
        e.preventDefault();
        try {
            await addStore({ name: storeName });
            setStoreName("");
            fetchStores();
            alert("Store added successfully!");
        } catch (error) {
            console.error("Error adding store:", error);
        }
    };

    return (
        <div>
            <h2>Owner Dashboard - Manage Stores</h2>

            <form onSubmit={handleAddStore}>
                <input
                    type="text"
                    placeholder="Store Name"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    required
                />
                <button type="submit">Add Store</button>
            </form>

            <h3>My Stores</h3>
            <ul>
                {stores.map((store) => (
                    <li key={store.id}>{store.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default OwnerDashboard;
