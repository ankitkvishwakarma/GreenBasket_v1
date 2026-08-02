import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const deliverySchema = new mongoose.Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    // Vehicle Information
    vehicleType: {
      type: String,
      enum: ["Bike", "Scooter", "Cycle", "Car"],
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    // Identity
    aadhaarNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    // Profile
    profileImage: {
      type: String,
      default: "",
    },

    // Documents
    documents: {
      aadhaarFront: {
        type: String,
        default: "",
      },

      aadhaarBack: {
        type: String,
        default: "",
      },

      drivingLicense: {
        type: String,
        default: "",
      },

      rcBook: {
        type: String,
        default: "",
      },

      insurance: {
        type: String,
        default: "",
      },
    },

    // Availability
    isAvailable: {
      type: Boolean,
      default: true,
    },

    // Verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    // Location
    currentLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: [0, 0], // [longitude, latitude]
      },
    },

    // Delivery Stats
    totalDeliveries: {
      type: Number,
      default: 0,
    },

    completedDeliveries: {
      type: Number,
      default: 0,
    },

    cancelledDeliveries: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },

    // Login
    lastLogin: {
      type: Date,
      default: null,
    },

    // Account
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Geo Index
deliverySchema.index({
  currentLocation: "2dsphere",
});

// Password Hash
deliverySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Compare Password
deliverySchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("Delivery", deliverySchema);