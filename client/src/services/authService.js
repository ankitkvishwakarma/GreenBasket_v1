import axiosInstance from "@/services/axios";

// ================= Login =================

export const loginAdmin = async (credentials) => {
  const { data } = await axiosInstance.post(
    "/auth/login",
    credentials
  );

  return data;
};

// ================= Logout =================

export const logoutAdmin = async () => {
  const { data } = await axiosInstance.post("/auth/logout");

  return data;
};

// ================= Profile =================

export const getProfile = async () => {
  const { data } = await axiosInstance.get("/auth/me");

  return data;
};