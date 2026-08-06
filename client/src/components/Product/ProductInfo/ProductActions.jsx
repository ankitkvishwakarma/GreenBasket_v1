import { motion } from "framer-motion";
import { ShoppingCart, Zap } from "lucide-react";

const ProductActions = ({
  selectedVariant,
  quantity,
  loading = false,
  onAddToCart,
  onBuyNow,
}) => {
  if (!selectedVariant) return null;

  const totalPrice = selectedVariant.price * quantity;

  const inStock = selectedVariant.stock > 0;

  return (
    <section className="space-y-6">
      {/* Estimated Total */}

      <div className="rounded-3xl border border-green-100 bg-gradient-to-r from-green-50 to-white p-5">

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Unit Price
          </span>

          <span className="font-semibold text-gray-900">
            ₹{selectedVariant.price}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray-500">
            Quantity
          </span>

          <span className="font-semibold text-gray-900">
            {quantity}
          </span>
        </div>

        <div className="my-5 border-t border-dashed" />

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            Estimated Total
          </span>

          <span className="text-3xl font-bold text-green-700">
            ₹{totalPrice}
          </span>
        </div>

      </div>

      {/* Action Buttons */}

      <div className="grid gap-4 sm:grid-cols-2">

        {/* Add To Cart */}

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          disabled={!inStock || loading}
          onClick={onAddToCart}
          className={`
            flex
            h-14
            items-center
            justify-center
            gap-3
            rounded-2xl
            font-semibold
            text-lg
            transition-all
            duration-300

            ${
              inStock
                ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
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

        {/* Buy Now */}

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          disabled={!inStock}
          onClick={onBuyNow}
          className={`
            flex
            h-14
            items-center
            justify-center
            gap-3
            rounded-2xl
            border-2
            text-lg
            font-semibold
            transition-all
            duration-300

            ${
              inStock
                ? "border-green-600 bg-white text-green-700 hover:bg-green-50"
                : "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500"
            }
          `}
        >
          <Zap size={20} />

          Buy Now
        </motion.button>

      </div>

      {/* Stock Status */}

      <div
        className={`rounded-2xl p-4 text-center font-medium ${
          inStock
            ? "bg-green-50 text-green-700 border border-green-100"
            : "bg-red-50 text-red-600 border border-red-100"
        }`}
      >
        {inStock
          ? `${selectedVariant.stock} items available`
          : "Currently Out of Stock"}
      </div>

    </section>
  );
};

export default ProductActions;