import axiosInstance from "@/services/axios";

// ================= Login =================

const login = async (credentials) => {
  const { data } = await axiosInstance.post(
    "/auth/login",
    credentials
  );

  return data;
};

// ================= Register =================

const register = async (userData) => {
  const { data } = await axiosInstance.post(
    "/auth/register",
    userData
  );

  return data;
};

// ================= Forgot Password =================

const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post(
    "/auth/forgot-password",
    { email }
  );

  return data;
};

// ================= Reset Password =================

const resetPassword = async (token, password) => {
  const { data } = await axiosInstance.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return data;
};

// ================= Logout =================

const logout = async () => {
  const { data } = await axiosInstance.post(
    "/auth/logout"
  );

  return data;
};

// ================= Get Profile =================

const getProfile = async () => {
  const { data } = await axiosInstance.get(
    "/auth/me"
  );

  return data;
};

const authService = {
  login,
  register,
  forgotPassword,
  resetPassword,
  logout,
  getProfile,
};

export default authService;