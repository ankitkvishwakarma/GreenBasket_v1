import slugify from "slugify";
import Product from "../models/Product.js";
import Categories from "../models/Categories.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
/* ======================================================
   Helpers
====================================================== */

const generateSKU = (categoryName = "GB") => {
    const prefix = categoryName
        .replace(/\s+/g, "")
        .substring(0, 3)
        .toUpperCase();

    const random = Math.floor(
        100000 + Math.random() * 900000
    );

    return `${prefix}-${random}`;
};

const calculateDiscount = (mrp, sellingPrice) => {
    if (!mrp || mrp <= 0) return 0;

    return Math.round(
        ((mrp - sellingPrice) / mrp) * 100
    );
};

/* ======================================================
   @desc    Create Product
   @route   POST /api/products
   @access  Private/Admin
====================================================== */

export const createProduct = asyncHandler(
    async (req, res, next) => {
        const {
            name,
            description,
            Categories: categoryId,
            brand,
            mrp,
            sellingPrice,
            stock,
            weight,
            unit,
            isFeatured,
            isOrganic,
            returnable,
            deliveryTime,
            tags,
            highlights,
            specifications,
            sku,
        } = req.body;

        /* ===============================
           Required Validation
        =============================== */

        if (!name)
            return next(
                new ErrorResponse("Product name is required.", 400)
            );

        if (!description)
            return next(
                new ErrorResponse("Description is required.", 400)
            );

        if (!categoryId)
            return next(
                new ErrorResponse("Category is required.", 400)
            );

        if (mrp == null)
            return next(
                new ErrorResponse("MRP is required.", 400)
            );

        if (sellingPrice == null)
            return next(
                new ErrorResponse(
                    "Selling price is required.",
                    400
                )
            );

        /* ===============================
           Price Validation
        =============================== */

        if (Number(sellingPrice) > Number(mrp)) {
            return next(
                new ErrorResponse(
                    "Selling price cannot be greater than MRP.",
                    400
                )
            );
        }

        /* ===============================
           Category Validation
        =============================== */

        const category = await Categories.findById(
            categoryId
        );

        if (!category) {
            return next(
                new ErrorResponse(
                    "Category not found.",
                    404
                )
            );
        }

        /* ===============================
           Image Validation
        =============================== */

        if (!req.files || req.files.length === 0) {
            return next(
                new ErrorResponse(
                    "Please upload at least one product image.",
                    400
                )
            );
        }

        /* ===============================
           Slug
        =============================== */

        let slug = slugify(name, {
            lower: true,
            strict: true,
            trim: true,
        });

        const existingSlug = await Product.findOne({
            slug,
        });

        if (existingSlug) {
            slug = `${slug}-${Date.now()}`;
        }

        /* ===============================
           SKU
        =============================== */

        let productSKU = sku;

        if (!productSKU) {
            productSKU = generateSKU(category.name);
        }

        /* ===============================
           Duplicate SKU
        =============================== */

        const existingSKU = await Product.findOne({
            sku: productSKU,
        });

        if (existingSKU) {
            return next(
                new ErrorResponse(
                    "SKU already exists.",
                    400
                )
            );
        }

        /* ===============================
           Create Product
        =============================== */
        const uploadedImages = [];

        for (const file of req.files) {
            const result = await uploadToCloudinary(
                file.buffer,
                "GreenBasket/products"
            );

            uploadedImages.push({
                url: result.secure_url,
                public_id: result.public_id,
            });
        }


        const product = await Product.create({
            name,
            slug,
            description,

            Categories: category._id,

            brand,

            sku: productSKU,

            images: uploadedImages,

            mrp,

            sellingPrice,

            discountPercentage:
                calculateDiscount(
                    Number(mrp),
                    Number(sellingPrice)
                ),

            stock,

            weight,

            unit,

            isFeatured,

            isOrganic,

            returnable,

            deliveryTime,

            tags,

            highlights,

            specifications,

            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product,
        });
    }
);
/* ======================================================
   @desc    Get All Products
   @route   GET /api/products
   @access  Public
====================================================== */

export const getProducts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";
    const featured = req.query.featured;
    const organic = req.query.organic;
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
    const sort = req.query.sort || "latest";

    const query = {};

    // Search
    if (keyword) {
        query.$or = [
            {
                name: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                brand: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                tags: {
                    $in: [new RegExp(keyword, "i")],
                },
            },
        ];
    }

    // Category
    // ===============================
// Category Filter (ID or Slug)
// ===============================

// ===============================
// Category Filter (ID or Slug)
// ===============================

if (category) {
    let categoryId = category;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(category);

    if (!isObjectId) {
        const categoryDoc = await Categories.findOne({
            slug: category,
        });

        if (categoryDoc) {
            categoryId = categoryDoc._id;
        } else {
            return res.status(200).json({
                success: true,
                count: 0,
                totalProducts: 0,
                totalPages: 0,
                currentPage: 1,
                products: [],
            });
        }
    }

    query.Categories = categoryId;
}

    // Featured
    if (featured === "true") {
        query.isFeatured = true;
    }

    // Organic
    if (organic === "true") {
        query.isOrganic = true;
    }

    // Availability
    // query.isAvailable = true;

    if (req.query.available === "true") {
            query.isAvailable = true;
            }

    // Price
    query.sellingPrice = {
        $gte: minPrice,
        $lte: maxPrice,
    };

    // Sorting
    let sortOption = {};

    switch (sort) {
        case "priceLow":
            sortOption = {
                sellingPrice: 1,
            };
            break;

        case "priceHigh":
            sortOption = {
                sellingPrice: -1,
            };
            break;

        case "rating":
            sortOption = {
                averageRating: -1,
            };
            break;

        case "popular":
            sortOption = {
                sold: -1,
            };
            break;

        case "latest":
        default:
            sortOption = {
                createdAt: -1,
            };
    }

    const totalProducts =
        await Product.countDocuments(query);

    const products = await Product.find(query)
        .populate("Categories", "name slug")
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit);

    res.status(200).json({
        success: true,

        count: products.length,

        totalProducts,

        totalPages: Math.ceil(
            totalProducts / limit
        ),

        currentPage: page,

        products,
    });
});

/* ======================================================
   @desc    Get Product By Slug
   @route   GET /api/products/:slug
   @access  Public
====================================================== */

export const getProductBySlug =
    asyncHandler(async (req, res, next) => {
        const product = await Product.findOne({
            slug: req.params.slug,
        })
            .populate("Categories", "name slug")
            .populate("createdBy", "name email");

        if (!product) {
            return next(
                new ErrorResponse(
                    "Product not found.",
                    404
                )
            );
        }

        res.status(200).json({
            success: true,
            product,
        });
    });

/* ======================================================
   @desc    Get Product By Id
   @route   GET /api/products/id/:id
   @access  Public
====================================================== */

export const getProductById =
    asyncHandler(async (req, res, next) => {
        const product = await Product.findById(
            req.params.id
        )
            .populate("Categories", "name slug")
            .populate("createdBy", "name email");

        if (!product) {
            return next(
                new ErrorResponse(
                    "Product not found.",
                    404
                )
            );
        }

        res.status(200).json({
            success: true,
            product,
        });
    });
/* ======================================================
 @desc    Update Product
 @route   PUT /api/products/:id
 @access  Private/Admin
====================================================== */

export const updateProduct = asyncHandler(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(
                new ErrorResponse("Product not found.", 404)
            );
        }

        const {
            name,
            description,
            Categories: categoryId,
            brand,
            mrp,
            sellingPrice,
            stock,
            weight,
            unit,
            sku,
            isFeatured,
            isOrganic,
            returnable,
            deliveryTime,
            tags,
            highlights,
            specifications,
        } = req.body;

        // ===============================
        // Category Validation
        // ===============================

        if (categoryId) {
            const category = await Categories.findById(categoryId);

            if (!category) {
                return next(
                    new ErrorResponse("Category not found.", 404)
                );
            }

            product.Categories = category._id;
        }

        // ===============================
        // Price Validation
        // ===============================

        if (
            mrp !== undefined &&
            sellingPrice !== undefined &&
            Number(sellingPrice) > Number(mrp)
        ) {
            return next(
                new ErrorResponse(
                    "Selling price cannot be greater than MRP.",
                    400
                )
            );
        }

        // ===============================
        // Slug
        // ===============================

        if (name && name !== product.name) {
            let slug = slugify(name, {
                lower: true,
                strict: true,
                trim: true,
            });

            const existingSlug = await Product.findOne({
                slug,
                _id: { $ne: product._id },
            });

            if (existingSlug) {
                slug = `${slug}-${Date.now()}`;
            }

            product.slug = slug;
        }

        // ===============================
        // SKU Validation
        // ===============================

        if (sku && sku !== product.sku) {
            const existingSKU = await Product.findOne({
                sku,
                _id: { $ne: product._id },
            });

            if (existingSKU) {
                return next(
                    new ErrorResponse("SKU already exists.", 400)
                );
            }

            product.sku = sku;
        }
        // ===============================
        // Images
        // ===============================

        if (req.files && req.files.length > 0) {
            // Delete old images from Cloudinary

            for (const image of product.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }

            const uploadedImages = [];

            for (const file of req.files) {
                const result = await uploadToCloudinary(
                    file.buffer,
                    "GreenBasket/products"
                );

                uploadedImages.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }

            product.images = uploadedImages;
        }

        // ===============================
        // Update Fields
        // ===============================

        if (name !== undefined) product.name = name;

        if (description !== undefined)
            product.description = description;

        if (brand !== undefined)
            product.brand = brand;

        if (mrp !== undefined)
            product.mrp = Number(mrp);

        if (sellingPrice !== undefined)
            product.sellingPrice = Number(sellingPrice);

        if (stock !== undefined)
            product.stock = Number(stock);

        if (weight !== undefined)
            product.weight = Number(weight);

        if (unit !== undefined)
            product.unit = unit;

        if (isFeatured !== undefined)
            product.isFeatured = isFeatured;

        if (isOrganic !== undefined)
            product.isOrganic = isOrganic;

        if (returnable !== undefined)
            product.returnable = returnable;

        if (deliveryTime !== undefined)
            product.deliveryTime = deliveryTime;

        if (tags !== undefined)
            product.tags = tags;

        if (highlights !== undefined)
            product.highlights = highlights;

        if (specifications !== undefined)
            product.specifications = specifications;

        // Recalculate Discount

        if (
            mrp !== undefined ||
            sellingPrice !== undefined
        ) {
            product.discountPercentage = calculateDiscount(
                product.mrp,
                product.sellingPrice
            );
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product,
        });
    
});

/* ======================================================
   @desc    Delete Product
   @route   DELETE /api/products/:id
   @access  Private/Admin
====================================================== */

export const deleteProduct = asyncHandler(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(
                new ErrorResponse("Product not found.", 404)
            );
        }

        // Optional:
        // Delete Cloudinary images here if required

        for (const image of product.images) {
            await cloudinary.uploader.destroy(
                image.public_id
            );
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
        });
    }
);
/* ======================================================
   @desc    Search Products
   @route   GET /api/products/search
   @access  Public
====================================================== */

export const searchProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword?.trim();

    if (!keyword) {
        return res.status(200).json({
            success: true,
            products: [],
        });
    }

    const products = await Product.find({
        isAvailable: true,
        $or: [
            {
                name: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                brand: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                tags: {
                    $in: [new RegExp(keyword, "i")],
                },
            },
        ],
    })
        .populate("Categories", "name slug")
        .sort({
            averageRating: -1,
            sold: -1,
        });

    res.status(200).json({
        success: true,
        count: products.length,
        products,
    });
});

/* ======================================================
   @desc    Filter Products
   @route   GET /api/products/filter
   @access  Public
====================================================== */

export const filterProducts = asyncHandler(async (req, res) => {
    const {
        category,
        minPrice,
        maxPrice,
        minRating,
        organic,
        featured,
        inStock,
        sort = "latest",
        page = 1,
        limit = 12,
    } = req.query;

    const query = {};

    // Category

    if (category) {
        query.Categories = category;
    }

    // Organic

    if (organic === "true") {
        query.isOrganic = true;
    }

    // Featured

    if (featured === "true") {
        query.isFeatured = true;
    }

    // In Stock

    if (inStock === "true") {
        query.stock = {
            $gt: 0,
        };
    }

    // Price

    if (minPrice || maxPrice) {
        query.sellingPrice = {};

        if (minPrice) {
            query.sellingPrice.$gte = Number(minPrice);
        }

        if (maxPrice) {
            query.sellingPrice.$lte = Number(maxPrice);
        }
    }

    // Rating

    if (minRating) {
        query.averageRating = {
            $gte: Number(minRating),
        };
    }

    // Sorting

    let sortOption = {};

    switch (sort) {
        case "priceLow":
            sortOption = {
                sellingPrice: 1,
            };
            break;

        case "priceHigh":
            sortOption = {
                sellingPrice: -1,
            };
            break;

        case "rating":
            sortOption = {
                averageRating: -1,
            };
            break;

        case "popular":
            sortOption = {
                sold: -1,
            };
            break;

        case "latest":
        default:
            sortOption = {
                createdAt: -1,
            };
            break;
    }

    const totalProducts =
        await Product.countDocuments(query);

    const products = await Product.find(query)
        .populate("Categories", "name slug")
        .sort(sortOption)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

    res.status(200).json({
        success: true,

        totalProducts,

        currentPage: Number(page),

        totalPages: Math.ceil(
            totalProducts / Number(limit)
        ),

        products,
    });
});
/* ======================================================
   @desc    Get Featured Products
   @route   GET /api/products/featured
   @access  Public
====================================================== */

export const getFeaturedProducts = asyncHandler(
    async (req, res) => {
        const limit = Number(req.query.limit) || 8;

        const products = await Product.find({
            isFeatured: true,
            isAvailable: true,
        })
            .populate("Categories", "name slug")
            .sort({
                createdAt: -1,
            })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    }
);

/* ======================================================
   @desc    Get Latest Products
   @route   GET /api/products/latest
   @access  Public
====================================================== */

export const getLatestProducts = asyncHandler(
    async (req, res) => {
        const limit = Number(req.query.limit) || 8;

        const products = await Product.find({
            isAvailable: true,
        })
            .populate("Categories", "name slug")
            .sort({
                createdAt: -1,
            })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    }
);

/* ======================================================
   @desc    Get Trending Products
   @route   GET /api/products/trending
   @access  Public
====================================================== */

export const getTrendingProducts = asyncHandler(
    async (req, res) => {
        const limit = Number(req.query.limit) || 8;

        const products = await Product.find({
            isAvailable: true,
        })
            .populate("Categories", "name slug")
            .sort({
                sold: -1,
                averageRating: -1,
            })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    }
);

/* ======================================================
   @desc    Get Best Seller Products
   @route   GET /api/products/best-sellers
   @access  Public
====================================================== */

export const getBestSellerProducts =
    asyncHandler(async (req, res) => {
        const limit = Number(req.query.limit) || 8;

        const products = await Product.find({
            isAvailable: true,
        })
            .populate("Categories", "name slug")
            .sort({
                sold: -1,
            })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    });

/* ======================================================
   @desc    Get Related Products
   @route   GET /api/products/:id/related
   @access  Public
====================================================== */

export const getRelatedProducts =
    asyncHandler(async (req, res, next) => {
        const product = await Product.findById(
            req.params.id
        );

        if (!product) {
            return next(
                new ErrorResponse(
                    "Product not found.",
                    404
                )
            );
        }

        const products = await Product.find({
            _id: {
                $ne: product._id,
            },

            Categories: product.Categories,

            isAvailable: true,
        })
            .populate("Categories", "name slug")
            .sort({
                averageRating: -1,
                sold: -1,
            })
            .limit(10);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    });
/* ======================================================
 @desc    Get Product Statistics
 @route   GET /api/products/stats
 @access  Private/Admin
====================================================== */

export const getProductStats = asyncHandler(
    async (req, res) => {
        const [
            totalProducts,
            availableProducts,
            outOfStockProducts,
            featuredProducts,
            organicProducts,
            totalCategories,
            inventoryValue,
            averageProductPrice,
            topRatedProducts,
            lowStockProducts,
        ] = await Promise.all([
            Product.countDocuments(),

            Product.countDocuments({
                isAvailable: true,
            }),

            Product.countDocuments({
                stock: 0,
            }),

            Product.countDocuments({
                isFeatured: true,
            }),

            Product.countDocuments({
                isOrganic: true,
            }),

            Categories.countDocuments(),

            Product.aggregate([
                {
                    $group: {
                        _id: null,
                        totalInventoryValue: {
                            $sum: {
                                $multiply: [
                                    "$sellingPrice",
                                    "$stock",
                                ],
                            },
                        },
                    },
                },
            ]),

            Product.aggregate([
                {
                    $group: {
                        _id: null,
                        averagePrice: {
                            $avg: "$sellingPrice",
                        },
                    },
                },
            ]),

            Product.find({
                isAvailable: true,
            })
                .select(
                    "name slug sellingPrice averageRating sold images"
                )
                .sort({
                    averageRating: -1,
                    sold: -1,
                })
                .limit(10),

            Product.find({
                stock: {
                    $gt: 0,
                    $lte: 10,
                },
            })
                .select(
                    "name stock sellingPrice images"
                )
                .sort({
                    stock: 1,
                }),
        ]);

        res.status(200).json({
            success: true,

            stats: {
                totalProducts,

                availableProducts,

                outOfStockProducts,

                featuredProducts,

                organicProducts,

                totalCategories,

                inventoryValue:
                    inventoryValue.length > 0
                        ? inventoryValue[0]
                            .totalInventoryValue
                        : 0,

                averageProductPrice:
                    averageProductPrice.length > 0
                        ? Number(
                            averageProductPrice[0].averagePrice.toFixed(
                                2
                            )
                        )
                        : 0,
            },

            topRatedProducts,

            lowStockProducts,
        });
    }
);
/* ======================================================
   Helper : Recalculate Product Rating
====================================================== */

const recalculateRatings = async (productId) => {
    const product = await Product.findById(productId);

    if (!product) return;

    const totalReviews = product.reviews.length;

    if (totalReviews === 0) {
        product.averageRating = 0;
        product.numReviews = 0;

        await product.save();

        return;
    }

    const totalRating = product.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
    );

    product.averageRating =
        totalRating / totalReviews;

    product.numReviews = totalReviews;

    await product.save();
};

/* ======================================================
   @desc    Create Product Review
   @route   POST /api/products/:id/review
   @access  Private
====================================================== */

export const createReview = asyncHandler(
    async (req, res, next) => {
        const { rating, comment } = req.body;

        const product = await Product.findById(
            req.params.id
        );

        if (!product) {
            return next(
                new ErrorResponse(
                    "Product not found.",
                    404
                )
            );
        }

        const alreadyReviewed =
            product.reviews.find(
                (review) =>
                    review.user.toString() ===
                    req.user._id.toString()
            );

        if (alreadyReviewed) {
            return next(
                new ErrorResponse(
                    "You have already reviewed this product.",
                    400
                )
            );
        }

        product.reviews.push({
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        });

        await product.save();

        await recalculateRatings(product._id);

        res.status(201).json({
            success: true,
            message: "Review added successfully.",
        });
    }
);

/* ======================================================
   @desc    Update Review
   @route   PUT /api/products/:id/review
   @access  Private
====================================================== */

export const updateReview = asyncHandler(
    async (req, res, next) => {
        const { rating, comment } = req.body;

        const product = await Product.findById(
            req.params.id
        );

        if (!product) {
            return next(
                new ErrorResponse(
                    "Product not found.",
                    404
                )
            );
        }

        const review = product.reviews.find(
            (review) =>
                review.user.toString() ===
                req.user._id.toString()
        );

        if (!review) {
            return next(
                new ErrorResponse(
                    "Review not found.",
                    404
                )
            );
        }

        if (rating !== undefined) {
            review.rating = Number(rating);
        }

        if (comment !== undefined) {
            review.comment = comment;
        }

        await product.save();

        await recalculateRatings(product._id);

        res.status(200).json({
            success: true,
            message: "Review updated successfully.",
        });
    }
);

/* ======================================================
   @desc    Delete Own Review
   @route   DELETE /api/products/:id/review
   @access  Private
====================================================== */

export const deleteReview = asyncHandler(
    async (req, res, next) => {
        const product = await Product.findById(
            req.params.id
        );

        if (!product) {
            return next(
                new ErrorResponse(
                    "Product not found.",
                    404
                )
            );
        }

        product.reviews = product.reviews.filter(
            (review) =>
                review.user.toString() !==
                req.user._id.toString()
        );

        await product.save();

        await recalculateRatings(product._id);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully.",
        });
    }
);

/* ======================================================
   @desc    Delete Any Review (Admin)
   @route   DELETE /api/products/:productId/review/:reviewId
   @access  Private/Admin
====================================================== */

export const deleteReviewByAdmin =
    asyncHandler(async (req, res, next) => {
        const product = await Product.findById(
            req.params.productId
        );

        if (!product) {
            return next(
                new ErrorResponse(
                    "Product not found.",
                    404
                )
            );
        }

        product.reviews = product.reviews.filter(
            (review) =>
                review._id.toString() !==
                req.params.reviewId
        );

        await product.save();

        await recalculateRatings(product._id);

        res.status(200).json({
            success: true,
            message: "Review removed successfully.",
        });
    });
