import axiosInstance from "@/services/axios";

const getCategories = async (params = {}) => {
  const { data } = await axiosInstance.get("/categories", {
    params,
  });

  return data;
};

const categoryService = {
  getCategories,
};

export default categoryService;