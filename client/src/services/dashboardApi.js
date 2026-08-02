import axiosInstance from "@/services/axios";

export const getDashboard = async () => {
  const { data } = await axiosInstance.get("/admin/dashboard");
  return data;
};

export const getStats = async () => {
  const { data } = await axiosInstance.get("/admin/analytics/stats");
  return data;
};

export const getMonthlyRevenue = async () => {
  const { data } = await axiosInstance.get(
    "/admin/analytics/monthly-revenue"
  );
  return data;
};

export const getRecentOrders = async () => {
  const { data } = await axiosInstance.get(
    "/admin/analytics/recent-orders"
  );
  return data;
};

export const getTopProducts = async () => {
  const { data } = await axiosInstance.get(
    "/admin/analytics/top-products"
  );
  return data;
};

export const getLowStockProducts = async () => {
  const { data } = await axiosInstance.get(
    "/admin/analytics/low-stock"
  );
  return data;
};