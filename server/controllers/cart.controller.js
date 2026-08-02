import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { calculateCartTotals } from "../utils/cartUtils.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Product ID and Quantity are required",
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock",
            });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [],
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(quantity);
        } else {
            cart.items.push({
                product: productId,
                quantity: Number(quantity),
            });
        }

        await calculateCartTotals(cart);
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Get Logged In User Cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product", "name images sellingPrice stock");

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cart: {
                    items: [],
                    totalItems: 0,
                    totalPrice: 0,
                },
            });
        }

        res.status(200).json({
            success: true,
            cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Update Cart Item Quantity
export const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "Product ID and Quantity are required",
            });
        }

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const item = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }

        // Quantity 0 ya usse kam hone par remove
        if (quantity <= 0) {
            cart.items = cart.items.filter(
                (item) => item.product.toString() !== productId
            );
        } else {
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            if (quantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Requested quantity exceeds available stock",
                });
            }

            item.quantity = quantity;
        }

        // Recalculate totals
       await calculateCartTotals(cart);

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Remove Product From Cart
export const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const itemExists = cart.items.some(
            (item) => item.product.toString() === productId
        );

        if (!itemExists) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }

        // Remove item
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        // Recalculate totals
       await calculateCartTotals(cart);

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            cart,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Clear Cart
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        // Empty the cart
        cart.items = [];
        cart.totalItems = 0;
        cart.totalPrice = 0;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Cart Summary
export const getCartSummary = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product", "name sellingPrice");

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({
                success: true,
                summary: {
                    subtotal: 0,
                    deliveryCharge: 0,
                    platformFee: 0,
                    discount: 0,
                    grandTotal: 0,
                },
            });
        }

        const subtotal = cart.totalPrice;

        // Business Logic
        const deliveryCharge = subtotal >= 500 ? 0 : 40;
        const platformFee = 5;
        const discount = 0;

        const grandTotal =
            subtotal + deliveryCharge + platformFee - discount;

        return res.status(200).json({
            success: true,
            summary: {
                subtotal,
                deliveryCharge,
                platformFee,
                discount,
                grandTotal,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};