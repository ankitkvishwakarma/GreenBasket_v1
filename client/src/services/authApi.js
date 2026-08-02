import axiosInstance from "@/services/axios";

export const loginAdmin = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
};

export const logoutAdmin = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};

export const getProfile = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};