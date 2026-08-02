import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        let wishlist = await Wishlist.findOne({
            user: req.user._id,
        });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: req.user._id,
                products: [productId],
            });

            return res.status(201).json({
                success: true,
                message: "Product added to wishlist",
                wishlist,
            });
        }

        const alreadyExists = wishlist.products.some(
            (id) => id.toString() === productId
        );

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Product already exists in wishlist",
            });
        }

        wishlist.products.push(productId);

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Remove From Wishlist
// ===============================
export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found",
            });
        }

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Check Product In Wishlist
// ===============================
export const checkWishlistProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        });

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                exists: false,
            });
        }

        const exists = wishlist.products.some(
            (id) => id.toString() === productId
        );

        res.status(200).json({
            success: true,
            exists,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Get My Wishlist
// ===============================
export const getMyWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        })
            .populate({
                path: "products",
                select:
                    "name slug description images mrp sellingPrice stock unit isAvailable isFeatured averageRating numReviews",
                populate: {
                    path: "Categories",
                    select: "name slug",
                },
            });

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                count: 0,
                wishlist: [],
            });
        }

        return res.status(200).json({
            success: true,
            count: wishlist.products.length,
            wishlist: wishlist.products,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};// ===============================
// Clear Wishlist
// ===============================
export const clearWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found",
            });
        }

        wishlist.products = [];

        await wishlist.save();

        res.status(200).json({
            success: true,
            message: "Wishlist cleared successfully",
            wishlist,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};