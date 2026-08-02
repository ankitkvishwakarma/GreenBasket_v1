import api from "@/services/axios";

const BASE_URL = "/orders";

const orderService = {
  // ===============================
  // Place Order
  // POST /api/orders/place
  // ===============================
  placeOrder: async (payload) => {
    const { data } = await api.post(`${BASE_URL}/place`, payload);
    return data;
  },

  // ===============================
  // My Orders
  // GET /api/orders/my-orders
  // ===============================
  getMyOrders: async () => {
    const { data } = await api.get(`${BASE_URL}/my-orders`);
    return data;
  },

  // ===============================
  // Order Details
  // GET /api/orders/:id
  // ===============================
  getOrderById: async (orderId) => {
    const { data } = await api.get(`${BASE_URL}/${orderId}`);
    return data;
  },

  // ===============================
  // Cancel Order
  // PUT /api/orders/cancel/:id
  // ===============================
  cancelOrder: async (orderId) => {
    const { data } = await api.put(
      `${BASE_URL}/cancel/${orderId}`
    );

    return data;
  },

  // ===============================
  // Download Invoice
  // (Future)
  // ===============================
  downloadInvoice: async (orderId) => {
    const { data } = await api.get(
      `/invoice/${orderId}`,
      {
        responseType: "blob",
      }
    );

    return data;
  },
};

export default orderService;