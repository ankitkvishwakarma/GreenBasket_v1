import mongoose from "mongoose";

/* ==========================================
   Review Schema
========================================== */

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* ==========================================
   Product Schema
========================================== */

const productSchema = new mongoose.Schema(
  {
    /* ======================================
       Basic Information
    ====================================== */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    Categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },

    brand: {
      type: String,
      default: "",
      trim: true,
    },

    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    /* ======================================
       Images
    ====================================== */

    images: [
      {
        url: {
          type: String,
          required: true,
        },

        public_id: {
          type: String,
          required: true,
        },
      },
    ],

    /* ======================================
       Pricing
    ====================================== */

    mrp: {
      type: Number,
      required: true,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* ======================================
       Inventory
    ====================================== */

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    weight: {
      type: Number,
      default: 0,
      min: 0,
    },

    unit: {
      type: String,
      enum: [
        "kg",
        "g",
        "ltr",
        "ml",
        "piece",
        "packet",
      ],
      default: "piece",
    },

    /* ======================================
       Product Flags
    ====================================== */

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isOrganic: {
      type: Boolean,
      default: false,
    },

    returnable: {
      type: Boolean,
      default: true,
    },

    /* ======================================
       Delivery
    ====================================== */

    deliveryTime: {
      type: String,
      default: "30-45 mins",
      trim: true,
    },

    /* ======================================
       Search & Marketing
    ====================================== */

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    highlights: [
      {
        type: String,
        trim: true,
      },
    ],

    /* ======================================
       Specifications
    ====================================== */

    specifications: {
      origin: {
        type: String,
        default: "",
        trim: true,
      },

      shelfLife: {
        type: String,
        default: "",
        trim: true,
      },

      storage: {
        type: String,
        default: "",
        trim: true,
      },
    },
        /* ======================================
       Ratings & Reviews
    ====================================== */

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    sold: {
      type: Number,
      default: 0,
      min: 0,
    },

    reviews: [reviewSchema],

    /* ======================================
       Audit Information
    ====================================== */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ==========================================
   Middleware
========================================== */

// Automatically calculate discount percentage
productSchema.pre("save", function (next) {
  if (this.mrp > 0) {
    this.discountPercentage = Math.round(
      ((this.mrp - this.sellingPrice) / this.mrp) * 100
    );
  } else {
    this.discountPercentage = 0;
  }

  // Automatically update availability
  this.isAvailable = this.stock > 0;

  next();
});

/* ==========================================
   Export Model
========================================== */

export default mongoose.model("Product", productSchema);