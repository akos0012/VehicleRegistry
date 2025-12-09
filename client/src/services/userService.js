import axios from "./axiosConfig";

const API_URL = "http://localhost:8080/api/user";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const findAll = async () => {
    const res = await axios.get(`${API_URL}`, { headers: getAuthHeader() });
    return res.data;
};

const findById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return res.data;
};

const create = async ({ fullName, username, password, role, active }) => {
    const res = await axios.post(`${API_URL}`,
        { fullName, username, password, role, active },
        { headers: getAuthHeader() }
    );
    return res.data;
};

const updateById = async (id, { username, role, fullName, active, failedLoginAttempts }) => {
    const res = await axios.put(`${API_URL}/${id}`,
        { username, role, fullName, active, failedLoginAttempts },
        { headers: getAuthHeader() }
    );
    return res.data;
};

const setActiveFalse = async (id) => {
    const res = await axios.put(
        `${API_URL}/setActiveFalse/${id}`,
        {},
        { headers: getAuthHeader() }
    );
    return res.data;
};

const deleteById = async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
};

const userService = {
    findAll,
    findById,
    create,
    updateById,
    setActiveFalse,
    deleteById
};

export default userService;