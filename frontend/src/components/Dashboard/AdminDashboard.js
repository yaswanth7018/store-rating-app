import { useState, useEffect } from "react";
import { getUsers, getStores, addUser, addStore } from "../../services/api";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [userForm, setUserForm] = useState({ name: "", email: "", address: "", password: "", role: "user" });
    const [storeForm, setStoreForm] = useState({ name: "", email: "", address: "" });
    const [filter, setFilter] = useState("");
    const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });

    // Fetch users and stores on load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await getUsers();
                const storesRes = await getStores();

                setUsers(usersRes.data);
                setStores(storesRes.data);

                setStats({
                    totalUsers: usersRes.data.length,
                    totalStores: storesRes.data.length,
                    totalRatings: storesRes.data.reduce((sum, store) => sum + store.ratings.length, 0),
                });
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    // Handle adding a new user
    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await addUser(userForm);
            alert("User added successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error adding user", error);
        }
    };

    // Handle adding a new store
    const handleAddStore = async (e) => {
        e.preventDefault();
        try {
            await addStore(storeForm);
            alert("Store added successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error adding store", error);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard - Manage Users & Stores</h2>

            {/* Stats */}
            <div>
                <h3>Platform Statistics</h3>
                <p>Total Users: {stats.totalUsers}</p>
                <p>Total Stores: {stats.totalStores}</p>
                <p>Total Ratings Submitted: {stats.totalRatings}</p>
            </div>

            {/* Filter */}
            <input
                type="text"
                placeholder="Search by Name or Address"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            {/* User List */}
            <h3>Users</h3>
            <ul>
                {users
                    .filter((user) => user.name.includes(filter) || user.address.includes(filter))
                    .map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email} - {user.role}
                        </li>
                    ))}
            </ul>

            {/* Store List */}
            <h3>Stores</h3>
            <ul>
                {stores
                    .filter((store) => store.name.includes(filter) || store.address.includes(filter))
                    .map((store) => (
                        <li key={store.id}>
                            {store.name} - {store.email} - Rating: {store.ratings.length > 0 ? store.averageRating : "N/A"}
                        </li>
                    ))}
            </ul>

            {/* Add New User Form */}
            <h3>Add User</h3>
            <form onSubmit={handleAddUser}>
                <input type="text" placeholder="Name" onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} required />
                <input type="email" placeholder="Email" onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} required />
                <input type="text" placeholder="Address" onChange={(e) => setUserForm({ ...userForm, address: e.target.value })} required />
                <input type="password" placeholder="Password" onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} required />
                <select onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}>
                    <option value="user">User</option>
                    <option value="owner">Store Owner</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Add User</button>
            </form>

            {/* Add New Store Form */}
            <h3>Add Store</h3>
            <form onSubmit={handleAddStore}>
                <input type="text" placeholder="Name" onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })} required />
                <input type="email" placeholder="Email" onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })} required />
                <input type="text" placeholder="Address" onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })} required />
                <button type="submit">Add Store</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
