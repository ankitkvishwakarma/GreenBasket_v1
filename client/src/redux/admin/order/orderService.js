import api from "@/services/axios";

const orderService = {
  // Admin - Get All Orders
  getOrders: async (params = {}) => {
    const { data } = await api.get("/orders", { params });
    return data;
  },

  // Get Single Order
  getOrderById: async (id) => {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  // Update Order Status
  updateOrderStatus: async (id, status) => {
    const { data } = await api.put(`/orders/status/${id}`, {
      status,
    });

    return data;
  },
};

export default orderService;