import { configureStore } from "@reduxjs/toolkit";

// ================= Auth =================
import authReducer from "./auth/authSlice";

// ================= Admin =================
import adminCategoryReducer from "./admin/category/AdminCategorySlice";
import adminProductReducer from "./admin/product/productSlice";
import couponReducer from "./admin/coupon/couponSlice";
import deliveryReducer from "./admin/delivery/deliverySlice";

// ================= User =================
import addressReducer from "./user/address/addressSlice";
import userDashboardReducer from "./user/userDashboard/userDashboardSlice";
import profileReducer from "./user/userprofile/profileSlice";
import userOrderReducer from "./user/userorder/orderSlice";
import cartReducer from "@/redux/cart/cartSlice.js";

// ================= Guest Product =================
import productReducer from "./product/productSlice";

export const store = configureStore({
  reducer: {
    // Authentication
    auth: authReducer,

    // Guest Product
    product: productReducer,
    

    // Admin
    adminProduct: adminProductReducer,
    category: adminCategoryReducer,
    coupon: couponReducer,
    delivery: deliveryReducer,

    // User
    address: addressReducer,
    userDashboard: userDashboardReducer,
    profile: profileReducer,
    order: userOrderReducer,
    cart: cartReducer,
  },

  devTools: import.meta.env.DEV,
});

// import { configureStore } from "@reduxjs/toolkit";

// // ================= Auth =================
// import authReducer from "./auth/authSlice";

// // ================= Future Reducers =================
// import productReducer from "./product/productSlice";
// import cartReducer from "./cart/cartSlice";
// import wishlistReducer from "./wishlist/wishlistSlice";
// import orderReducer from "./order/orderSlice";
// import categoryReducer from "./category/categorySlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,

//     // Future
//     
//     cart: cartReducer,
//     wishlist: wishlistReducer,
//     order: orderReducer,
//     category: categoryReducer,
//   },

//   devTools: import.meta.env.DEV,
// });


// ye baad mein add hoga
// export const store = configureStore({
//   reducer: {
//     // Existing reducers
//     auth: authReducer,
//     customer: customerReducer,
//     category: categoryReducer,
//     product: productReducer,
//     cart: cartReducer,
//     wishlist: wishlistReducer,
//
//     payment: paymentReducer,
//     review: reviewReducer,
//     coupon: couponReducer,
//     notification: notificationReducer,
//     delivery: deliveryReducer,

//     // Dashboard
//     userDashboard: userDashboardReducer,
//   },
// });