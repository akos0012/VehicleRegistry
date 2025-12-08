import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

const login = async (username, password) => {
    const res = await axios.post(`${API_URL}/login`, { username, password });
    return res.data.token;
};

const register = async ({ username, fullName, password }) => {
    await axios.post(`${API_URL}/register`, { username, fullName, password });
};

const getRoles = (token) => {
    const decoded = jwtDecode(token);
    return decoded.roles || [];
};

const authService = {
    login,
    register,
    getRoles
};

export default authService;