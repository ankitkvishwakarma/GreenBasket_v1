import api from "./axios";

const authService = {
  // ================= Register =================
  register: async (userData) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },

  // ================= Login =================
  login: async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },

  // ================= Logout =================
  logout: async () => {
    const { data } = await api.post("/auth/logout");
    return data;
  },

  // ================= Forgot Password =================
  forgotPassword: async (email) => {
    const { data } = await api.post("/auth/forgot-password", {
      email,
    });

    return data;
  },

  // ================= Reset Password =================
  resetPassword: async (token, password) => {
    const { data } = await api.post(
      `/auth/reset-password/${token}`,
      {
        password,
      }
    );

    return data;
  },

  // ================= Get Logged In User =================
  getProfile: async () => {
    const { data } = await api.get("/auth/profile");
    return data;
  },
};

export default authService;