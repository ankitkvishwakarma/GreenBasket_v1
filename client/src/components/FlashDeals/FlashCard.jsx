import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

const FlashCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 hover:shadow-2xl"
    >
      {/* Discount Badge */}
      <div className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
        -{product.discount}%
      </div>

      {/* Wishlist */}
      <button className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:bg-red-50">
        <Heart
          size={18}
          className="text-gray-600 transition group-hover:text-red-500"
        />
      </button>

      {/* Product Image */}
      <div className="mt-8 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-4">
        <motion.img
          whileHover={{
            scale: 1.08,
            rotate: 2,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
          }}
          src={product.image}
          alt={product.name}
          className="h-full max-h-44 w-full object-contain"
        />
      </div>

      {/* Product Name */}
      <h3 className="mt-5 line-clamp-2 min-h-[52px] text-base font-bold text-gray-800 sm:text-lg">
        {product.name}
      </h3>

      {/* Rating */}
      <div className="mt-2 flex items-center gap-1">
        <Star
          size={15}
          fill="#FFD43B"
          color="#FFD43B"
        />
        <span className="text-sm font-medium text-gray-600">
          {product.rating}
        </span>
      </div>

      {/* Price */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xl font-bold text-green-600 sm:text-2xl">
          ₹{product.price}
        </span>

        <span className="text-sm text-gray-400 line-through">
          ₹{product.oldPrice}
        </span>
      </div>

      {/* Stock */}
      <div className="mt-3">
        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {product.stock}
        </span>
      </div>

      {/* Add to Cart */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        <ShoppingCart size={18} />
        Add to Cart
      </motion.button>
    </motion.div>
  );
};

export default FlashCard;