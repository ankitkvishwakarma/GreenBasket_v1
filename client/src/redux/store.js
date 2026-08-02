import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./admin/product/productSlice";
import authReducer from "./auth/authSlice";
import categoryReducer from "./admin/category/AdminCategorySlice";
import couponReducer from "@/redux/admin/coupon/couponSlice";
import deliveryReducer from "./admin/delivery/deliverySlice";
import orderReducer from "./user/userorder/orderSlice";
import addressReducer from "@/redux/user/address/addressSlice";

import userDashboardReducer from "./user/userDashboard/userDashboardSlice";
import profileReducer from "./user/userprofile/profileSlice";
import userOrderReducer from "./user/userorder/orderSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    category: categoryReducer,
    coupon: couponReducer,
    order: orderReducer,
    delivery: deliveryReducer,
    userDashboard: userDashboardReducer,
    profile: profileReducer,
    order: userOrderReducer,
    address: addressReducer,
  },
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
//     product: productReducer,
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