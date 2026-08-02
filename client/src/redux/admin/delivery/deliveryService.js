import api from "@/services/axios";

const deliveryService = {
  // Get All Delivery Boys
  getDeliveryBoys: async () => {
    const { data } = await api.get("/delivery");
    return data;
  },

  // Get Single Delivery Boy
  getDeliveryBoyById: async (id) => {
    const { data } = await api.get(`/delivery/${id}`);
    return data;
  },

  // Register Delivery Boy
 registerDeliveryBoy: async (payload) => {
  const { data } = await api.post(
    "/delivery/register",
    payload
  );

  return data;
},

  // Update Delivery Boy
  updateDeliveryBoy: async (id, payload) => {
    const { data } = await api.put(`/delivery/${id}`, payload);
    return data;
  },

  // Delete Delivery Boy
  deleteDeliveryBoy: async (id) => {
    const { data } = await api.delete(`/delivery/${id}`);
    return data;
  },

  // Verify Delivery Boy
  verifyDeliveryBoy: async (id) => {
    const { data } = await api.patch(
      `/delivery/${id}/verify`
    );
    return data;
  },

  // Toggle Availability
  toggleAvailability: async (id) => {
    const { data } = await api.patch(
      `/delivery/${id}/availability`
    );
    return data;
  },

  // Assign Order
  assignOrder: async (payload) => {
    const { data } = await api.post(
      "/delivery/assign-order",
      payload
    );
    return data;
  },

  // Live Location
  getLiveLocation: async (id) => {
    const { data } = await api.get(
      `/delivery/${id}/location`
    );
    return data;
  },
};

export default deliveryService;