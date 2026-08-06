import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Star,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";

const ProductCard = ({
  product,
  onWishlist,
  onAddToCart,
  loading = false,
}) => {
  const [liked, setLiked] = useState(false);

  if (!product) return null;

  const {
    _id,
    slug,
    name,
    images = [],
    price,
    originalPrice,
    discount = 0,
    rating = 0,
    numReviews = 0,
    stock = 0,
    category,
    isOrganic = false,
    isFeatured = false,
    weight = "500g",
  } = product;

  const image =
    images?.[0]?.url ||
    images?.[0] ||
    "/images/product-placeholder.png";

  const inStock = stock > 0;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLiked((prev) => !prev);

    if (onWishlist) {
      onWishlist(product);
    }
  };

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inStock) return;

    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <motion.article
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl"
    >
      {/* Discount */}

      {discount > 0 && (
        <div className="absolute left-4 top-4 z-20 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          -{discount}%
        </div>
      )}

      {/* Wishlist */}

      <button
        onClick={handleWishlist}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110"
      >
        <Heart
          size={19}
          className={`transition-all duration-300 ${
            liked
              ? "fill-red-500 text-red-500"
              : "text-gray-500"
          }`}
        />
      </button>

      <Link
        to={`/products/${slug || _id}`}
        className="block"
      >
        {/* Image Section */}

        <div className="relative overflow-hidden bg-[#f7f8fa]">
          <div className="aspect-square overflow-hidden">
            <motion.img
              whileHover={{
                scale: 1.08,
              }}
              transition={{
                duration: 0.3,
              }}
              src={image}
              alt={name}
              className="h-full w-full object-contain p-8"
            />
          </div>

          {/* Badges */}

          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {isOrganic && (
              <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                Organic
              </span>
            )}

            {isFeatured && (
              <span className="flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-medium text-black">
                <BadgeCheck size={12} />
                Bestseller
              </span>
            )}
          </div>

          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-sm">
              <span className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}

        <div className="space-y-3 p-5">

          {/* Category */}

          <p className="text-xs font-medium uppercase tracking-wider text-green-600">
            {category?.name || "Fresh Grocery"}
          </p>

          {/* Product Name */}

          <h3 className="line-clamp-2 min-h-[56px] text-lg font-semibold leading-7 text-gray-900 transition group-hover:text-green-700">
            {name}
          </h3>
                    {/* Rating & Reviews */}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">

              <div className="flex items-center rounded-full bg-yellow-50 px-2 py-1">

                <Star
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="ml-1 text-sm font-semibold text-gray-800">
                  {rating?.toFixed(1) || "0.0"}
                </span>

              </div>

              <span className="text-sm text-gray-500">
                ({numReviews} Reviews)
              </span>

            </div>

            {inStock ? (
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                In Stock
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                Sold Out
              </span>
            )}
          </div>

          {/* Price Section */}

          <div className="flex items-end justify-between">

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-2xl font-bold text-gray-900">
                  ₹{price}
                </h2>

                {originalPrice > price && (
                  <span className="text-base text-gray-400 line-through">
                    ₹{originalPrice}
                  </span>
                )}

              </div>

              {discount > 0 && (
                <p className="mt-1 text-sm font-medium text-green-600">
                  You save ₹{originalPrice - price}
                </p>
              )}

            </div>

          </div>

          {/* Weight */}

          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">

            <div>

              <p className="text-xs text-gray-500">
                Pack Size
              </p>

              <h4 className="mt-1 font-semibold text-gray-900">
                {weight}
              </h4>

            </div>

            <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
              Fresh
            </span>

          </div>

          {/* Delivery */}

          <div className="flex items-center justify-between rounded-2xl bg-green-50 px-4 py-3">

            <div>

              <p className="text-xs text-gray-500">
                Delivery
              </p>

              <p className="font-semibold text-green-700">
                30-45 mins
              </p>

            </div>

            <div className="text-right">

              <p className="text-xs text-gray-500">
                Shipping
              </p>

              <p className="font-semibold text-gray-900">
                Free
              </p>

            </div>

          </div>
                    {/* Feature Chips */}

          <div className="flex flex-wrap gap-2">

            <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              🌱 Farm Fresh
            </span>

            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              🚚 Fast Delivery
            </span>

            <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
              ⭐ Premium Quality
            </span>

          </div>

          {/* Action Buttons */}

          <div className="mt-2 flex items-center gap-3">

            <motion.button
              whileTap={{
                scale: 0.96,
              }}
              whileHover={{
                scale: 1.02,
              }}
              disabled={!inStock || loading}
              onClick={handleCart}
              className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300

              ${
                inStock
                  ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
            >

              {loading ? (
                <>

                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                  Adding...

                </>
              ) : (
                <>

                  <ShoppingCart size={20} />

                  Add To Cart

                </>
              )}

            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={handleWishlist}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-red-300 hover:bg-red-50"
            >

              <Heart
                size={20}
                className={`transition-all duration-300

                ${
                  liked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                }`}
              />

            </motion.button>

          </div>

          {/* Bottom Hover CTA */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileHover={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mt-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white"
          >
            View Product Details →
          </motion.div>

        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;