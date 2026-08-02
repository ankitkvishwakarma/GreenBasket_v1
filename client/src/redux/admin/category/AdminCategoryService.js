import api from "@/services/axios";

const CATEGORY_URL = "/categories";

// Get All Categories
export const getCategoriesAPI = async (params = {}) => {
  const response = await api.get(CATEGORY_URL, { params });
  return response.data;
};

// Get Category By ID
export const getCategoryByIdAPI = async (id) => {
  const response = await api.get(`${CATEGORY_URL}/${id}`);
  return response.data;
};

// Create Category
export const createCategoryAPI = async (categoryData) => {
  const response = await api.post(CATEGORY_URL, categoryData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update Category
export const updateCategoryAPI = async ({ id, categoryData }) => {
  const response = await api.put(`${CATEGORY_URL}/${id}`, categoryData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete Category
export const deleteCategoryAPI = async (id) => {
  const response = await api.delete(`${CATEGORY_URL}/${id}`);
  return response.data;
};