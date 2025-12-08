import axios from "./axiosConfig";

const API_URL = "http://localhost:8080/api/brand-request";

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

const create = async ({ brandName, message, userId }) => {
    const res = await axios.post(`${API_URL}`,
        { brandName, message, userId },
        { headers: getAuthHeader() }
    );
    return res.data;
};

const update = async (id, { status }) => {
    const res = await axios.put(`${API_URL}/${id}`,
        { status },
        { headers: getAuthHeader() }
    );
    return res.data;
};

const brandRequestService = {
    findAll,
    findById,
    create,
    update
};

export default brandRequestService;
