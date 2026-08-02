import Product from "../models/Product.js";

// ===============================
// Add Review
// ===============================
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: "Rating is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user already reviewed
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

    product.averageRating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      reviews: product.reviews,
      averageRating: product.averageRating,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Product Reviews
// ===============================
export const getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "reviews averageRating numReviews"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      averageRating: product.averageRating,
      totalReviews: product.numReviews,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Review
// ===============================
export const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const productId = req.params.productId;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const review = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        review.rating = rating;
        review.comment = comment;

        product.numReviews = product.reviews.length;

        product.averageRating =
            product.reviews.reduce((acc, item) => acc + item.rating, 0) /
            product.reviews.length;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Delete My Review
// ===============================
export const deleteReview = async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const review = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        product.reviews = product.reviews.filter(
            (r) => r.user.toString() !== req.user._id.toString()
        );

        product.numReviews = product.reviews.length;

        if (product.numReviews === 0) {
            product.averageRating = 0;
        } else {
            product.averageRating =
                product.reviews.reduce((acc, item) => acc + item.rating, 0) /
                product.numReviews;
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===============================
// Delete Review By Admin
// ===============================
export const deleteReviewByAdmin = async (req, res) => {
    try {
        const { productId, reviewId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const review = product.reviews.id(reviewId);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        review.deleteOne();

        product.numReviews = product.reviews.length;

        if (product.numReviews === 0) {
            product.averageRating = 0;
        } else {
            product.averageRating =
                product.reviews.reduce((acc, item) => acc + item.rating, 0) /
                product.numReviews;
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: "Review deleted successfully by admin",
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};