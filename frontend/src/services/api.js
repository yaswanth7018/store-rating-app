import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Authentication
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);

// Admin API
export const getUsers = () => axios.get(`${API_URL}/admin/users`);
export const addUser = (data) => axios.post(`${API_URL}/admin/users`, data); 
export const deleteUser = (id) => axios.delete(`${API_URL}/admin/users/${id}`);
export const getStores = () => axios.get(`${API_URL}/admin/stores`);
export const deleteStore = (id) => axios.delete(`${API_URL}/admin/stores/${id}`);

// Owner API
export const addStore = (data) => axios.post(`${API_URL}/owner/stores`, data);
export const getStoreRatings = () => axios.get(`${API_URL}/owner/ratings`);
export const deleteRating = (id) => axios.delete(`${API_URL}/owner/ratings/${id}`);

// User API
export const submitRating = (data) => axios.post(`${API_URL}/user/rate`, data);
