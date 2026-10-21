import api from "../../../utils/axios";

export const fetchCrafts = async () => {
    const data = await api.get('/craft/all');
    return data;
}