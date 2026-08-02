import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import User from "../models/User.js";

/* ==========================================================
   Get My Profile
========================================================== */
export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select(
            "-password -refreshToken -resetPasswordToken -resetPasswordExpire"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Get Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
            error: error.message,
        });
    }
};

/* ==========================================================
   Update Profile
========================================================== */
export const updateProfile = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            dob,
            gender,
        } = req.body;

        const user = await User.findById(req.user._id);


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        /* ---------------- Email Check ---------------- */

        if (email && email !== user.email) {
            const emailExists = await User.findOne({
                email: email.toLowerCase(),
                _id: { $ne: user._id },
            });

            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });
            }

            user.email = email.toLowerCase();
        }

        /* ---------------- Phone Check ---------------- */

        if (phone && phone !== user.phone) {
            const phoneExists = await User.findOne({
                phone,
                _id: { $ne: user._id },
            });

            if (phoneExists) {
                return res.status(400).json({
                    success: false,
                    message: "Phone number already exists",
                });
            }

            user.phone = phone;
        }
        // gender
        if (gender) {
            user.gender = gender;
        }
        // dob

           if (dob !== undefined) {
            user.dob = dob || null;
        }
        /* ---------------- Name ---------------- */

        if (name) {
            user.name = name.trim();
        }

        await user.save();

        const updatedUser = await User.findById(user._id).select(
            "-password -refreshToken -resetPasswordToken -resetPasswordExpire"
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });

    }
    catch (error) {

        console.error("Update Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
};

/* ==========================================================
   Update Profile Avatar
========================================================== */
export const updateProfileAvatar = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete old avatar
        if (user.avatar?.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        // Upload new avatar
        const result = await uploadToCloudinary(
            req.file.buffer,
            "greenbasket/users"
        );

        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url,
        };

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile photo updated successfully",
            avatar: user.avatar,
        });

    } catch (error) {

        console.error("Avatar Upload Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to upload avatar",
            error: error.message,
        });
    }
};
/* ==========================================================
   Remove Profile Avatar
========================================================== */
export const removeProfileAvatar = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.avatar?.public_id) {
            return res.status(400).json({
                success: false,
                message: "Profile photo not found",
            });
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(user.avatar.public_id);

        user.avatar = {
            public_id: "",
            url: "",
        };

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile photo removed successfully",
        });

    } catch (error) {

        console.error("Remove Avatar Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to remove profile photo",
            error: error.message,
        });
    }
};

/* ==========================================================
   Change Password
========================================================== */
export const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = req.body;

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            return res.status(400).json({
                success: false,
                message: "All password fields are required",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        const user = await User.findById(req.user._id)
            .select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch =
            await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {

        console.error("Change Password Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to change password",
            error: error.message,
        });
    }
};

/* ==========================================================
   Deactivate Account
========================================================== */
export const deactivateAccount = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.isActive = false;
        user.refreshToken = "";

        await user.save();

        res.status(200).json({
            success: true,
            message: "Account deactivated successfully",
        });

    } catch (error) {

        console.error("Deactivate Account Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to deactivate account",
            error: error.message,
        });
    }
};
