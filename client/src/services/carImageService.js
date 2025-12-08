import axios from "./axiosConfig";

const API_URL = "http://localhost:8080/api/car-image";

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

const getFile = async (id) => {
    const res = await axios.get(`${API_URL}/${id}/file`, {
        headers: {
            ...getAuthHeader(),
        },
        responseType: "arraybuffer",
    });
    return res;
};

const create = async (favoriteCarId, imageFile) => {
    const formData = new FormData();
    formData.append("favoriteCarId", favoriteCarId);
    formData.append("imageData", imageFile);

    const res = await axios.post(`${API_URL}`, formData, {
        headers: {
            ...getAuthHeader(),
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

const deleteById = async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
};

const carImageService = {
    findAll,
    getFile,
    findAllByFavCarId,
    create,
    deleteById
};

export default carImageService;