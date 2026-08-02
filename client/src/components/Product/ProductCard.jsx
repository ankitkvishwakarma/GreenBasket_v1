import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Eye,
  ShoppingCart,
  Star,
} from "lucide-react";

const ProductCard = ({
  product,
  view = "grid",
  onQuickView,
  onAddToCart,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const image =
    product.images?.[0]?.url ||
    "/images/product-placeholder.png";

  const inStock = product.stock > 0;

  const discount =
    product.discount ||
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0);

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl ${
        view === "list"
          ? "flex flex-col md:flex-row"
          : ""
      }`}
    >
      {/* ================= Image ================= */}

      <div
        className={`relative overflow-hidden bg-gray-50 ${
          view === "list"
            ? "md:w-72"
            : ""
        }`}
      >
        <Link to={`/product/${product.slug}`}>
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className={`object-cover transition duration-500 group-hover:scale-110 ${
              view === "list"
                ? "h-full w-full"
                : "h-64 w-full"
            }`}
          />
        </Link>

        {/* Discount */}

        {discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}

        {/* Stock */}

        {!inStock && (
          <span className="absolute bottom-4 left-4 rounded-full bg-gray-900 px-3 py-1 text-xs text-white">
            Out of Stock
          </span>
        )}

        {/* Wishlist */}

        <button
          type="button"
          onClick={() => onToggleWishlist?.(product)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:bg-red-500 hover:text-white"
        >
          <Heart size={18} />
        </button>

        {/* Quick View */}

        <button
          type="button"
          onClick={() => onQuickView?.(product)}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow opacity-0 transition group-hover:opacity-100 hover:bg-green-600 hover:text-white"
        >
          <Eye size={18} />
        </button>
      </div>

      {/* ================= Content ================= */}

      <div className="flex flex-1 flex-col justify-between p-5">

        <div>

          <p className="text-sm text-green-600">
            {product.category?.name}
          </p>

          <Link to={`/product/${product.slug}`}>
            <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900 hover:text-green-600">
              {product.name}
            </h3>
          </Link>

          <div className="mt-3 flex items-center gap-2">

            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />

            <span>
              {product.rating ?? 4.8}
            </span>

            <span className="text-sm text-gray-500">
              ({product.numReviews ?? 0})
            </span>

          </div>

          <div className="mt-4 flex items-center gap-3">

            <span className="text-2xl font-bold text-green-600">
              ₹{product.price}
            </span>

            {product.originalPrice && (
              <span className="text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}

          </div>

        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={
            inStock
              ? { scale: 1.02 }
              : {}
          }
          disabled={!inStock}
          onClick={() => onAddToCart?.(product)}
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition ${
            inStock
              ? "bg-green-600 text-white hover:bg-green-700"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
        >
          <ShoppingCart size={18} />
          {inStock
            ? "Add to Cart"
            : "Out of Stock"}
        </motion.button>

      </div>

    </motion.article>
  );
};

export default ProductCard;