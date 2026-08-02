import api from "../services/axios.js";

const productService = {
    // Get All Products
    getProducts: async (params = {}) => {
        const { data } = await api.get("/products", {
            params,
        });

        return data;
    },

    // Get Product By ID
    getProductById: async (id) => {
        const { data } = await api.get(`/products/${id}`);
        return data;
    },

    // Get Product By Slug
    getProductBySlug: async (slug) => {
        const { data } = await api.get(`/products/slug/${slug}`);
        return data;
    },

    // Featured Products
    getFeaturedProducts: async () => {
        const { data } = await api.get("/products/featured");
        return data;
    },

    // Latest Products
    getLatestProducts: async () => {
        const { data } = await api.get("/products/latest");
        return data;
    },

    // Best Seller Products
    getBestSellerProducts: async () => {
        const { data } = await api.get("/products/bestseller");
        return data;
    },

    // Related Products
    getRelatedProducts: async (productId) => {
        const { data } = await api.get(
            `/products/related/${productId}`
        );
        return data;
    },

    // Search Products
    searchProducts: async (keyword) => {
        const { data } = await api.get("/products/search", {
            params: { keyword },
        });

        return data;
    },
};

export default productService;