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

export const checkStorefrontName = async (name) => {
    const data = await api.get('/storefronts/check-name/', {
        params: { name }
    })
    return data.available
}

export const createStorefront = async ({ name, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    const data = await api.post('/storefronts/create/', formData);
    return data;
};