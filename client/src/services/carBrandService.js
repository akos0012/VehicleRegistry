import axios from "./axiosConfig";

const API_URL = "http://localhost:8080/api/car-brand";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const findAll = async () => {
    const res = await axios.get(`${API_URL}`, { headers: getAuthHeader() });
    return res.data;
};

const findAllByFavCarId = async (favCarId) => {
    const res = await axios.get(`${API_URL}/favorite/${favCarId}`, { headers: getAuthHeader() });
    return res.data;
};

const create = async ({ name }) => {
    const res = await axios.post(`${API_URL}`,
        { name },
        { headers: getAuthHeader() }
    );
    return res.data;
};

const carBrandService = {
    findAll,
    findAllByFavCarId,
    create,
};

export default carBrandService;