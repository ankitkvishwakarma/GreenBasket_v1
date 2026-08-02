import Product from "../models/Product.js";

export const calculateCartTotals = async (cart) => {
    let totalItems = 0;
    let totalPrice = 0;

    for (const item of cart.items) {
        const product = await Product.findById(item.product);

        if (product) {
            totalItems += item.quantity;
            totalPrice += product.sellingPrice * item.quantity;
        }
    }

    cart.totalItems = totalItems;
    cart.totalPrice = totalPrice;
};