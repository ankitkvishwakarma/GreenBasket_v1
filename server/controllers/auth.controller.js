import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import welcomeTemplate from "../templates/welcome.template.js";
import resetPasswordTemplate from "../templates/resetPassword.template.js";
import { sendEmail } from "../services/email.service.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generateToken.js";

// Register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Validation
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check Existing User
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }],
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // Create User
        const user = await User.create({
            name,
            email,
            phone,
            password,
        });

        // Generate Tokens
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id);

        // Save Refresh Token
        user.refreshToken = refreshToken;
        await user.save();

        try {
            await sendEmail({
                to: user.email,
                subject: "Welcome to GreenBasket",
                html: welcomeTemplate(user.name),
            });
        } catch (error) {
            console.log("Welcome email failed:", error.message);
        }
        // Remove Password
        user.password = undefined;

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            accessToken,
            user,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// =======================
// Login User
// =======================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find User
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check Password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check Active
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated",
            });
        }

        // Generate Tokens
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id);

        // Save Refresh Token
        user.refreshToken = refreshToken;
        user.lastLogin = new Date();

        await user.save();

        // Remove Password
        user.password = undefined;

        // Refresh Token Cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            accessToken,
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// =======================
// Logout User
// =======================
export const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        // Agar cookie me refresh token hai to database se remove karo
        if (refreshToken) {
            const user = await User.findOne({ refreshToken });

            if (user) {
                user.refreshToken = "";
                await user.save();
            }
        }

        // Cookie Clear
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logout Successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// ==============================
// Get Logged In User
// ==============================

export const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password");

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==============================
// Update Profile
// ==============================

export const updateProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// Change Password
// ==============================

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Validation
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old password and new password are required",
            });
        }

        // Get User with Password
        const user = await User.findById(req.user._id).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check Old Password
        const isMatch = await user.comparePassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // Same Password Check
        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password must be different from old password",
            });
        }

        // Update Password
        user.password = newPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Generate Token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Frontend Reset URL
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        // Send Email
        try {
            await sendEmail({
                to: user.email,
                subject: "Reset Your GreenBasket Password",
                html: resetPasswordTemplate(user.name, resetUrl),
            });

            return res.status(200).json({
                success: true,
                message: "Password reset email sent successfully",
            });

        } catch (error) {

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return res.status(500).json({
                success: false,
                message: "Email could not be sent",
            });
        }

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const resetPassword = async (req, res) => {
    try {
        // Hash Token
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        // Find User
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset password token is invalid or expired",
            });
        }

        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        // Update Password
        user.password = password;

        // Clear Reset Fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// =======================
// Refresh Access Token
// =======================
// export const refreshAccessToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.cookies;

//     if (!refreshToken) {
//       return res.status(401).json({
//         success: false,
//         message: "Refresh token is missing",
//       });
//     }

//     // Verify Refresh Token
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.JWT_REFRESH_SECRET
//     );

//     // Find User
//     const user = await User.findById(decoded.id);

//     if (!user || user.refreshToken !== refreshToken) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Refresh Token",
//       });
//     }

//     // Generate New Access Token
//     const accessToken = generateAccessToken(user._id, user.role);

//     return res.status(200).json({
//       success: true,
//       accessToken,
//     });

//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Refresh Token Expired",
//     });
//   }
// };