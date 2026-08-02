import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const {
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            pincode,
            country,
            addressType,
        } = req.body;

        if (
            !fullName ||
            !phone ||
            !addressLine1 ||
            !city ||
            !state ||
            !pincode
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        const address = await Address.create({
            user: req.user._id,
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            pincode,
            country,
            addressType,
        });

        return res.status(201).json({
            success: true,
            message: "Address added successfully",
            address,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Get All Addresses
export const getAddresses = async (req, res) => {
    try {

        const addresses = await Address.find({
            user: req.user._id,
        }).sort({ isDefault: -1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: addresses.length,
            addresses,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Update Address
export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        const {
            fullName,
            phone,
            addressLine1,
            addressLine2,
            landmark,
            city,
            state,
            pincode,
            country,
            addressType,
        } = req.body;

        if (fullName) address.fullName = fullName;
        if (phone) address.phone = phone;
        if (addressLine1) address.addressLine1 = addressLine1;
        if (addressLine2 !== undefined) address.addressLine2 = addressLine2;
        if (landmark !== undefined) address.landmark = landmark;
        if (city) address.city = city;
        if (state) address.state = state;
        if (pincode) address.pincode = pincode;
        if (country) address.country = country;
        if (addressType) address.addressType = addressType;

        await address.save();

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Address
export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        await address.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Set Default Address
export const setDefaultAddress = async (req, res) => {
    try {
        const { id } = req.params;

        // Check address belongs to logged-in user
        const address = await Address.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        // Remove default from all addresses
        await Address.updateMany(
            { user: req.user._id },
            { $set: { isDefault: false } }
        );

        // Make selected address default
        address.isDefault = true;
        await address.save();

        return res.status(200).json({
            success: true,
            message: "Default address updated successfully",
            address,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};