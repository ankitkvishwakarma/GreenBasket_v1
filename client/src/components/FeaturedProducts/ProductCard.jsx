import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-2xl"
    >
      {/* Discount */}
      <div className="absolute left-4 top-4 z-20 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
        -{product.discount}%
      </div>

      {/* Badge */}
      <div className="absolute left-4 top-14 z-20 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
        {product.badge}
      </div>

      {/* Actions */}
      <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:bg-red-50">
          <Heart
            size={18}
            className="text-gray-600 hover:text-red-500"
          />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:bg-green-50">
          <Eye
            size={18}
            className="text-gray-600 hover:text-green-600"
          />
        </button>
      </div>

      {/* Image */}
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-gray-50 p-6">
        <motion.img
          whileHover={{
            scale: 1.08,
            rotate: 2,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
          }}
          src={product.image}
          alt={product.name}
          className="h-full max-h-52 w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Name */}
        <h3 className="line-clamp-2 min-h-[52px] text-lg font-bold text-gray-800">
          {product.name}
        </h3>

        {/* Unit */}
        <p className="mt-1 text-sm text-gray-500">
          {product.unit}
        </p>

        {/* Rating */}
        <div className="mt-3 flex items-center justify-between">

          <div className="flex items-center gap-1">
            <Star
              size={16}
              fill="#FFD43B"
              color="#FFD43B"
            />

            <span className="font-medium">
              {product.rating}
            </span>

            <span className="text-sm text-gray-500">
              ({product.reviews})
            </span>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {product.stock}
          </span>

        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">

          <span className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </span>

          <span className="text-gray-400 line-through">
            ₹{product.oldPrice}
          </span>

        </div>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <ShoppingCart size={18} />

          Add to Cart
        </motion.button>

      </div>
    </motion.div>
  );
};

export default ProductCard;