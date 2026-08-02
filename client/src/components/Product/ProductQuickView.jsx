import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";

const ProductQuickView = ({
  isOpen,
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  // Reset quantity whenever product changes
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!isOpen || !product) return null;

  const image =
    product.images?.[0]?.url ||
    "/images/product-placeholder.png";

  const inStock = product.stock > 0;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white"
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-20 rounded-full bg-gray-100 p-2 hover:bg-red-500 hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="bg-gray-50">
              <img
                src={image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col p-8">
              <p className="text-sm font-medium text-green-600">
                {product.category?.name}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span>{product.rating ?? 4.8}</span>

                <span className="text-gray-500">
                  ({product.numReviews ?? 0} Reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-3xl font-bold text-green-600">
                  ₹{product.price}
                </span>

                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Stock */}
              <p
                className={`mt-4 font-medium ${
                  inStock
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </p>

              {/* Description */}
              <p className="mt-6 leading-7 text-gray-600">
                {product.description ||
                  "Fresh and premium quality grocery product delivered directly to your doorstep."}
              </p>

              {/* Quantity */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center overflow-hidden rounded-2xl border">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.max(1, prev - 1)
                      )
                    }
                    className="p-3 hover:bg-gray-100"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="w-14 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) => prev + 1)
                    }
                    className="p-3 hover:bg-gray-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={!inStock}
                  onClick={() =>
                    onAddToCart?.({
                      ...product,
                      quantity,
                    })
                  }
                  className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 font-semibold ${
                    inStock
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductQuickView;