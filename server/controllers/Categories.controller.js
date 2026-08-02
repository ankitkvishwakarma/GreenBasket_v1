import Categories from "../models/Categories.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import mongoose from "mongoose";
// =====================================
// Upload Image to Cloudinary
// =====================================
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// =====================================
// Delete Image from Cloudinary
// =====================================
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};
// =====================================
// Create Category
// =====================================
export const createCategories = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // Generate Slug
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    // Check Existing Category
    const existingCategory = await Categories.findOne({
      $or: [
        { name: name.trim() },
        { slug },
      ],
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    // Default Image Object
    let image = {
      public_id: "",
      url: "",
    };

    // Upload Image to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "greenbasket/categories"
      );

      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Create Category
    const category = await Categories.create({
      name: name.trim(),
      slug,
      description: description?.trim() || "",
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create Category Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// // =====================================
// // Get All Categories
// // =====================================
// export const getCategories = async (req, res) => {
//   try {
//     const { search, status } = req.query;

//     const filter = {};

//     // Search by Name
//     if (search) {
//       filter.name = {
//         $regex: search,
//         $options: "i",
//       };
//     }

//     // Filter by Status
//     if (status === "true") {
//       filter.isActive = true;
//     }

//     if (status === "false") {
//       filter.isActive = false;
//     }

//     const categories = await Categories.find(filter)
//       .sort({ createdAt: -1 })
//       .select("-__v");

//     return res.status(200).json({
//       success: true,
//       count: categories.length,
//       categories,
//     });
//   } catch (error) {
//     console.error("Get Categories Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// =====================================
// Get All Categories
// =====================================
export const getCategories = async (req, res) => {
  try {
    const { search, status } = req.query;

    const filter = {};

    // Search by Name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by Status
    if (status === "true") {
      filter.isActive = true;
    }

    if (status === "false") {
      filter.isActive = false;
    }

    const categories = await Categories.find(filter)
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =====================================
// Get Single Category
// =====================================
export const getCategoriesById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category = await Categories.findById(id).select("-__v");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Get Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =====================================
// Update Category
// =====================================
export const updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    // Check Category
    const category = await Categories.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check Duplicate Name
    if (name && name.trim() !== category.name) {
      const existingCategory = await Categories.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category already exists",
        });
      }

      category.name = name.trim();
      category.slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
    }

    // Update Description
    if (description !== undefined) {
      category.description = description.trim();
    }

    // Update Status
    if (isActive !== undefined) {
      category.isActive = isActive;
    }

    // Replace Image
    if (req.file) {
      // Delete Old Image
      if (category.image?.public_id) {
        await deleteFromCloudinary(category.image.public_id);
      }

      // Upload New Image
      const result = await uploadToCloudinary(
        req.file.buffer,
        "greenbasket/categories"
      );

      category.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("Update Category Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete Category
// =====================================
export const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;

    // Check Category
    const category = await Categories.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Delete Image From Cloudinary
    if (category.image?.public_id) {
      await deleteFromCloudinary(category.image.public_id);
    }

    // Delete Category
    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete Category Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};