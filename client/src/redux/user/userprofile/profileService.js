import api from "@/services/axios";

/* ==========================================
   Get Logged In User Profile
========================================== */
const getProfile = async () => {
    const response = await api.get("/user/profile");
    return response.data;
};

/* ==========================================
   Update Profile
========================================== */
const updateProfile = async (profileData) => {
    const response = await api.put(
        "/user/profile",
        profileData
    );

    return response.data;
};

/* ==========================================
   Update Profile Avatar
========================================== */
const updateAvatar = async (formData) => {
    const response = await api.put(
        "/user/profile/avatar",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

/* ==========================================
   Remove Avatar
========================================== */
const removeAvatar = async () => {
    const response = await api.delete(
        "/user/profile/avatar"
    );

    return response.data;
};

/* ==========================================
   Change Password
========================================== */
const changePassword = async (passwordData) => {
    const response = await api.put(
        "/user/change-password",
        passwordData
    );

    return response.data;
};

/* ==========================================
   Deactivate Account
========================================== */
const deactivateAccount = async () => {
    const response = await api.put(
        "/user/deactivate"
    );

    return response.data;
};

/* ==========================================
   Export
========================================== */

const profileService = {
    getProfile,
    updateProfile,
    updateAvatar,
    removeAvatar,
    changePassword,
    deactivateAccount,
};

export default profileService;