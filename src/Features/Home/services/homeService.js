import api from "../../../utils/axios";

export const fetchCrafts = async () => {
    const data = await api.get('/craft/all');
    return data;
}

export const fetchStorefronts = async (page = 1) => {
    const data = await api.get('/storefronts/all', {
        params: { page }
    });
    return data;
}