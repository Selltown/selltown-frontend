import api from "../../../utils/axios";

export const fetchStorefrontItems = async (storefrontId) => {
    const data = await api.get(`/items/storefront/${storefrontId}`);
    return data;
}