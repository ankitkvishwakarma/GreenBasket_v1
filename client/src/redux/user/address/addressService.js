import api from "@/services/axios";

const addressService = {
  // ===========================
  // Get All Addresses
  // ===========================
  getAddresses: async () => {
    const response = await api.get("/address");
    return response.data;
  },

  // ===========================
  // Add Address
  // ===========================
  createAddress: async (addressData) => {
    const response = await api.post(
      "/address",
      addressData
    );

    return response.data;
  },

  // ===========================
  // Update Address
  // ===========================
  updateAddress: async ({ id, data }) => {
    const response = await api.put(
      `/address/${id}`,
      data
    );

    return response.data;
  },

  // ===========================
  // Delete Address
  // ===========================
  deleteAddress: async (id) => {
    const response = await api.delete(
      `/address/${id}`
    );

    return response.data;
  },

  // ===========================
  // Set Default Address
  // ===========================
  setDefaultAddress: async (id) => {
    const response = await api.patch(
      `/address/set-default/${id}`
    );

    return response.data;
  },
};

export default addressService;