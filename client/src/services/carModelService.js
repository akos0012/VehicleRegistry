import axios from "./axiosConfig";

const API_URL = "http://localhost:8080/api/car-model";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const findAll = async () => {
    const res = await axios.get(`${API_URL}`, { headers: getAuthHeader() });
    return res.data;
};

const findAllByBrandId = async (brandId) => {
    const res = await axios.get(`${API_URL}/brand-id/${brandId}`, { headers: getAuthHeader() });
    return res.data;
};

const findByName = async (name) => {
    const res = await axios.get(`${API_URL}/name/${name}`, { headers: getAuthHeader() });
    return res.data;
};

const create = async ({ name, brandId }) => {
    const res = await axios.post(`${API_URL}`,
        { name, brandId },
        { headers: getAuthHeader() }
    );
    return res.data;
};

const carModelService = {
    findAll,
    findByName,
    findAllByBrandId,
    create,
};

export default carModelService;