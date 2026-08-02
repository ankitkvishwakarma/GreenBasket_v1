import api from "@/services/axios";

const userDashboardService = {
    // Dashboard Data
    getDashboard: async () => {
        const { data } = await api.get("/user/dashboard");
        return data;
    },

    // Refresh Dashboard
    refreshDashboard: async () => {
        const { data } = await api.get("/user/dashboard");
        return data;
    },
};

export default userDashboardService;