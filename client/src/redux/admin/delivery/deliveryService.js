import api from "@/services/axios";

const deliveryService = {
  // ==========================================
  // GET ALL DELIVERY BOYS
  // GET /api/delivery
  // ==========================================
  getDeliveryBoys: async (params = {}) => {
    const { data } = await api.get("/delivery", {
      params,
    });

    return data;
  },

  // ==========================================
  // GET DELIVERY BOY BY ID
  // GET /api/delivery/:id
  // ==========================================
  getDeliveryBoyById: async (id) => {
    const { data } = await api.get(`/delivery/${id}`);

    return data;
  },

  // ==========================================
  // REGISTER DELIVERY BOY
  // POST /api/delivery/register
  // ==========================================
  registerDeliveryBoy: async (formData) => {
    const { data } = await api.post(
      "/delivery/register",
      formData
    );

    return data;
  },

  // ==========================================
  // UPDATE DELIVERY BOY
  // PUT /api/delivery/:id
  // ==========================================
  updateDeliveryBoy: async (id, formData) => {
    const { data } = await api.put(
      `/delivery/${id}`,
      formData
    );

    return data;
  },

  // ==========================================
  // VERIFY DELIVERY BOY
  // PUT /api/delivery/verify/:id
  // ==========================================
  verifyDeliveryBoy: async (id) => {
    const { data } = await api.put(
      `/delivery/verify/${id}`
    );

    return data;
  },

  // ==========================================
  // UPDATE AVAILABILITY
  // PUT /api/delivery/availability/:id
  // ==========================================
  updateAvailability: async ({ id, isAvailable }) => {
    const { data } = await api.put(
      `/delivery/availability/${id}`,
      {
        isAvailable,
      }
    );

    return data;
  },

  // ==========================================
  // DELETE DELIVERY BOY
  // DELETE /api/delivery/:id
  // ==========================================
  deleteDeliveryBoy: async (id) => {
    const { data } = await api.delete(
      `/delivery/${id}`
    );

    return data;
  },

  // ==========================================
  // ASSIGN DELIVERY BOY TO ORDER
  // PUT /api/delivery/assign
  // ==========================================
  assignDeliveryBoy: async ({
    orderId,
    deliveryBoyId,
  }) => {
    const { data } = await api.put(
      "/delivery/assign",
      {
        orderId,
        deliveryBoyId,
      }
    );

    return data;
  },

  // ==========================================
  // GET DELIVERY BOY LOCATION
  // GET /api/delivery/location/:id
  // ==========================================
  getDeliveryLocation: async (id) => {
    const { data } = await api.get(
      `/delivery/location/${id}`
    );

    return data;
  },
};

export default deliveryService;