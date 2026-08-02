import api from "../";

const categoryService = {
  getCategories: async () => {
    const { data } = await api.get("/categories");
    return data;
  },

  getCategoryById: async (id) => {
    const { data } = await api.get(`/categories/${id}`);
    return data;
  },
};

export default categoryService;