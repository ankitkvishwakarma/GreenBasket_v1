import Coupon from "../models/Coupon.js";

// ============================
// Create Coupon (Admin)
// ============================
export const createCoupon = async (req, res) => {
    try {
        const {
            code,
            discountType,
            discountValue,
            minimumOrderAmount,
            maximumDiscount,
            usageLimit,
            expiresAt,
        } = req.body;

        // Validation
        if (!code || !discountType || !discountValue || !expiresAt) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        // Check Existing Coupon
        const existingCoupon = await Coupon.findOne({
            code: code.toUpperCase(),
        });

        if (existingCoupon) {
            return res.status(400).json({
                success: false,
                message: "Coupon already exists",
            });
        }

        // Create Coupon
        const coupon = await Coupon.create({
            code: code.toUpperCase(),
            discountType,
            discountValue,
            minimumOrderAmount: minimumOrderAmount || 0,
            maximumDiscount: maximumDiscount || 0,
            usageLimit: usageLimit || 1,
            expiresAt,
        });

        res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            coupon,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ============================
// Get All Coupons
// ============================
export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: coupons.length,
            coupons,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// ============================
// Get Coupon By ID
// ============================
export const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;

        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }

        return res.status(200).json({
            success: true,
            coupon,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ============================
// Update Coupon (Admin)
// ============================
export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }

        const {
            code,
            discountType,
            discountValue,
            minimumOrderAmount,
            maximumDiscount,
            usageLimit,
            expiresAt,
            isActive,
        } = req.body;

        if (code) {
            const existingCoupon = await Coupon.findOne({
                code: code.toUpperCase(),
                _id: { $ne: id },
            });

            if (existingCoupon) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon code already exists",
                });
            }

            coupon.code = code.toUpperCase();
        }

        if (discountType) coupon.discountType = discountType;
        if (discountValue !== undefined) coupon.discountValue = discountValue;
        if (minimumOrderAmount !== undefined)
            coupon.minimumOrderAmount = minimumOrderAmount;
        if (maximumDiscount !== undefined)
            coupon.maximumDiscount = maximumDiscount;
        if (usageLimit !== undefined)
            coupon.usageLimit = usageLimit;
        if (expiresAt) coupon.expiresAt = expiresAt;
        if (isActive !== undefined)
            coupon.isActive = isActive;

        await coupon.save();

        return res.status(200).json({
            success: true,
            message: "Coupon updated successfully",
            coupon,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ============================
// Delete Coupon (Admin)
// ============================
export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;

        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }

        await coupon.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Coupon deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ============================
// Apply Coupon
// ============================
export const applyCoupon = async (req, res) => {
    try {
        const { code, totalAmount } = req.body;

        // Validation
        if (!code || totalAmount === undefined) {
            return res.status(400).json({
                success: false,
                message: "Coupon code and total amount are required",
            });
        }

        if (Number(totalAmount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid order amount",
            });
        }

        // Find Coupon
        const coupon = await Coupon.findOne({
            code: code.trim().toUpperCase(),
        });

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Invalid coupon code",
            });
        }

        // Active Check
        if (!coupon.isActive) {
            return res.status(400).json({
                success: false,
                message: "Coupon is inactive",
            });
        }

        // Expiry Check
        if (coupon.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Coupon has expired",
            });
        }

        // Usage Limit Check
        if (
            coupon.usageLimit > 0 &&
            coupon.usedCount >= coupon.usageLimit
        ) {
            return res.status(400).json({
                success: false,
                message: "Coupon usage limit exceeded",
            });
        }

        // Minimum Order Validation
        if (totalAmount < coupon.minimumOrderAmount) {
            return res.status(400).json({
                success: false,
                message: `Minimum order amount should be ₹${coupon.minimumOrderAmount}`,
            });
        }

        // Calculate Discount
        let discount = 0;

        if (coupon.discountType === "PERCENTAGE") {
            discount = (Number(totalAmount) * coupon.discountValue) / 100;

            if (
                coupon.maximumDiscount > 0 &&
                discount > coupon.maximumDiscount
            ) {
                discount = coupon.maximumDiscount;
            }
        } else if (coupon.discountType === "FIXED") {
            discount = coupon.discountValue;
        }

        // Final Amount
        const finalAmount = Math.max(
            0,
            Number(totalAmount) - discount
        );

        return res.status(200).json({
            success: true,
            message: "Coupon applied successfully",
            coupon: {
                id: coupon._id,
                code: coupon.code,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
            },
            totalAmount: Number(totalAmount),
            discount,
            finalAmount,
            savedAmount: discount,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};