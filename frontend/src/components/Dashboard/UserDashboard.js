import { useEffect, useState } from "react";
import { getStores } from "../../services/api";

const UserDashboard = () => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchStores = async () => {
            const res = await getStores();
            setStores(res.data);
        };
        fetchStores();
    }, []);

    return (
        <div>
            <h2>User Dashboard - Browse Stores</h2>
            <ul>
                {stores.map((store) => (
                    <li key={store.id}>{store.name} - Rating: {store.rating}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
