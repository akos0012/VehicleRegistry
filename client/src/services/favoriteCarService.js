import axios from "./axiosConfig";

const API_URL = "http://localhost:8080/api/fav-car";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const findAll = async () => {
    const res = await axios.get(`${API_URL}`, { headers: getAuthHeader() });
    return res.data;
};

const findAllByUserId = async (userId) => {
    const res = await axios.get(`${API_URL}/user-id/${userId}`, { headers: getAuthHeader() });
    return res.data;
};

const findById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return res.data;
};

const create = async ({ userId, carModelId, year, color, fuel }) => {
    const res = await axios.post(`${API_URL}`,
        { userId, carModelId, year, color, fuel },
        { headers: getAuthHeader() }
    );
    return res.data;
};

const createWithModel = async ({ userId, carModelName, brandId, year, color, fuel }) => {
    const res = await axios.post(`${API_URL}/createWithModel`,
        { userId, carModelName, brandId, year, color, fuel },
        { headers: getAuthHeader() }
    );
    return res.data;
};


const updateById = async (id, { carModelId, year, color, fuel }) => {
    const res = await axios.put(`${API_URL}/${id}`,
        { carModelId, year, color, fuel },
        { headers: getAuthHeader() }
    );
    return res.data;
};

const updateByIdWithModel = async (id, { carModelName, brandId, year, color, fuel }) => {
    const res = await axios.put(`${API_URL}/updateWithModel/${id}`,
        { carModelName, brandId, year, color, fuel },
        { headers: getAuthHeader() }
    );
    return res.data;
};

const deleteById = async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
};

const favoriteCarService = {
    findAll,
    findAllByUserId,
    findById,
    create,
    createWithModel,
    updateById,
    updateByIdWithModel,
    deleteById
};

export default favoriteCarService;