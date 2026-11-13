import api from "../../../utils/axios";

export const fetchStorefrontItems = async (slug, page = 1) => {
    const data = await api.get(`/items/storefront/${slug}/`, {
        params: { page }
    });
    return data;
}

export const fetchStorefrontData = async (slug) => {
    const data = await api.get(`/storefronts/by-slug/${slug}/`);
    return data;
}

export const updateStorefront = async (id, name) => {
    const data = await api.patch(`/storefronts/${id}/update/`, {name});
    return data;
}

export const createItem = async (item) => {
    const data = await api.post("/items/create/", item);
    return data;
}