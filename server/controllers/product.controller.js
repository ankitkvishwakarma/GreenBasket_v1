import Product from "../models/Product.js";
import Categories from "../models/Categories.js";
import slugify from "slugify";

// Create Product
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            Categories,
            brand,
            mrp,
            sellingPrice,
            stock,
            unit,
            weight,
        } = req.body;

        // Validation
        if (
            !name ||
            !description ||
            !Categories ||
            !mrp ||
            !sellingPrice
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory",
            });
        }

        if (sellingPrice > mrp) {
            return res.status(400).json({
                success: false,
                message: "Selling price cannot be greater than MRP",
            });
        }

        // Check Categories
        const CategoriesExists = await Categories.findById(Categories);

        if (!CategoriesExists) {
            return res.status(404).json({
                success: false,
                message: "Categories not found",
            });
        }

        // Duplicate Product
        const exists = await Product.findOne({
            slug: slugify(name, { lower: true }),
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Product already exists",
            });
        }

        const product = await Product.create({
            name,
            slug: slugify(name, { lower: true }),
            description,
            Categories,
            brand,
            mrp,
            sellingPrice,
            stock,
            unit,
            weight,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Get All Products
export const getProducts = async (req, res) => {
    try {
        const {
            search = "",
            Categories,
            minPrice,
            maxPrice,
            featured,
            sort = "latest",
            page = 1,
            limit = 10,
        } = req.query;

        let filter = {};

        // Search
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i",
            };
        }

        // Categories
        if (Categories) {
            filter.Categories = Categories;
        }

        // Price Filter
        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Featured
        if (featured === "true") {
            filter.featured = true;
        }

        let sortOption = {};

        switch (sort) {
            case "priceLow":
                sortOption.price = 1;
                break;

            case "priceHigh":
                sortOption.price = -1;
                break;

            case "name":
                sortOption.name = 1;
                break;

            default:
                sortOption.createdAt = -1;
        }

        const skip = (Number(page) - 1) * Number(limit);

        const products = await Product.find(filter)
            .populate("Categories", "name")
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            totalProducts,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit),
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Get Single Product
export const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)
            .populate("Categories", "name")
            .populate("createdBy", "name");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// update product

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const {
            name,
            description,
            price,
            discountPrice,
            Categories,
            stock,
            unit,
            featured,
        } = req.body;

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (discountPrice) product.discountPrice = discountPrice;
        if (Categories) product.Categories = Categories;
        if (stock) product.stock = stock;
        if (unit) product.unit = unit;

        if (featured !== undefined) {
            product.featured = featured;
        }

        if (req.files && req.files.length > 0) {
            product.images = req.files.map((file) => ({
                url: file.path,
                public_id: file.filename,
            }));
        }

        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// lowstock
export const getLowStockProducts = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;

        const products = await Product.find({
            stock: { $lte: 10 }
        })
            .populate("Categories", "name")
            .sort({ stock: 1 })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// getFeaturedProducts

export const getFeaturedProducts = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;

        const products = await Product.find({
            featured: true,
        })
            .populate("Categories", "name")
            .sort({ createdAt: -1 })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getLatestProducts = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;

        const products = await Product.find()
            .populate("Categories", "name")
            .sort({ createdAt: -1 })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// getRelatedProducts   //

export const getRelatedProducts = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const relatedProducts = await Product.find({
            Categories: product.Categories,
            _id: { $ne: product._id }
        })
            .limit(8);

        res.status(200).json({
            success: true,
            count: relatedProducts.length,
            products: relatedProducts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// getBestSellerProducts


export const getBestSellerProducts = async (req, res) => {

    try {

        const limit = Number(req.query.limit) || 10;

        const products = await Product.find()
            .sort({ sold: -1 })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

// getProductStats//


export const getProductStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();

        const featuredProducts = await Product.countDocuments({
            featured: true,
        });

        const lowStockProducts = await Product.countDocuments({
            stock: { $lte: 10 },
        });

        const outOfStock = await Product.countDocuments({
            stock: 0,
        });

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                featuredProducts,
                lowStockProducts,
                outOfStock,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// addReview



export const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product",
            });
        }

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => acc + item.rating, 0) /
            product.reviews.length;

        await product.save();

        res.status(201).json({
            success: true,
            message: "Review added successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};