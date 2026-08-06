import { motion } from "framer-motion";

import {
  Star,
  Heart,
  Share2,
  CheckCircle2,
  Leaf,
  Truck,
} from "lucide-react";

const ProductHeader = ({ product }) => {
  if (!product) return null;

  return (
    <div className="space-y-6">

      {/* Category */}

      <div className="flex flex-wrap items-center gap-3">

        <span className="rounded-full bg-green-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">

          {product.Categories?.name || "Fresh Grocery"}

        </span>

        {product.isOrganic && (

          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700">

            <Leaf size={14} />

            Organic

          </span>

        )}

      </div>

      {/* Product Name */}

      <motion.h1
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="text-3xl font-bold leading-tight text-gray-900"
      >

        {product.name}

      </motion.h1>

      {/* Brand */}

      {product.brand && (

        <p className="text-sm font-medium text-gray-500">

          Brand :

          <span className="ml-2 font-semibold text-gray-700">

            {product.brand}

          </span>

        </p>

      )}

      {/* Rating */}

      <div className="flex flex-wrap items-center gap-5">

        <div className="flex items-center gap-2 rounded-xl bg-yellow-50 px-4 py-2">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold">

            {product.averageRating?.toFixed(1) || "0.0"}

          </span>

          <span className="text-gray-500">

            ({product.numReviews || 0})

          </span>

        </div>

        <div className="text-sm text-gray-500">

          {product.sold || 0} Sold

        </div>

      </div>

      {/* Stock */}

      <div className="flex flex-wrap items-center gap-3">

        {product.stock > 0 ? (

          <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

            <CheckCircle2 size={16} />

            In Stock

          </span>

        ) : (

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">

            Out Of Stock

          </span>

        )}

        <span className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

          <Truck size={16} />

          Delivery in 24 Hours

        </span>

      </div>

      {/* Description */}

      <p className="leading-8 text-gray-600">

        {product.description}

      </p>

      {/* Wishlist & Share */}

      <div className="flex items-center gap-4">

        <button
          className="flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 transition hover:border-red-300 hover:bg-red-50"
        >

          <Heart size={18} />

          Wishlist

        </button>

        <button
          className="flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 transition hover:border-green-300 hover:bg-green-50"
        >

          <Share2 size={18} />

          Share

        </button>

      </div>

    </div>
  );
};

export default ProductHeader;