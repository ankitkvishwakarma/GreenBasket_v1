import { useState } from "react";
import { Heart, ShoppingCart, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

const ProductInfo = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onBuyNow,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

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
    <div className="space-y-6">

      {/* Category */}
      <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
        {product.category?.name}
      </span>

      {/* Product Name */}
      <h1 className="text-4xl font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold">
            {product.rating ?? 4.8}
          </span>
        </div>

        <span className="text-gray-500">
          ({product.numReviews ?? 0} Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">

        <span className="text-4xl font-bold text-green-600">
          ₹{product.price}
        </span>

        {product.originalPrice && (
          <span className="text-2xl text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>
        )}

        {discount > 0 && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
            {discount}% OFF
          </span>
        )}

      </div>

      {/* Stock */}

      <p
        className={`font-semibold ${
          inStock
            ? "text-green-600"
            : "text-red-500"
        }`}
      >
        {inStock ? "In Stock" : "Out of Stock"}
      </p>

      {/* Description */}

      <p className="leading-8 text-gray-600">
        {product.description}
      </p>

      {/* Quantity */}

      <div className="flex items-center gap-4">

        <div className="flex items-center overflow-hidden rounded-xl border">

          <button
            type="button"
            onClick={() =>
              setQuantity((prev) =>
                Math.max(1, prev - 1)
              )
            }
            className="px-4 py-3 hover:bg-gray-100"
          >
            -
          </button>

          <span className="w-14 text-center font-semibold">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setQuantity((prev) => prev + 1)
            }
            className="px-4 py-3 hover:bg-gray-100"
          >
            +
          </button>

        </div>

        <span className="text-gray-500">
          Available : {product.stock}
        </span>

      </div>

      {/* Buttons */}

      <div className="flex flex-wrap gap-4">

        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!inStock}
          onClick={() =>
            onAddToCart?.({
              ...product,
              quantity,
            })
          }
          className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold ${
            inStock
              ? "bg-green-600 text-white hover:bg-green-700"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
        >
          <ShoppingCart size={20} />
          Add To Cart
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            onBuyNow?.({
              ...product,
              quantity,
            })
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-semibold text-white hover:bg-orange-600"
        >
          <Zap size={20} />
          Buy Now
        </motion.button>

        <button
          type="button"
          onClick={() =>
            onToggleWishlist?.(product)
          }
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 hover:bg-red-500 hover:text-white"
        >
          <Heart size={20} />
        </button>

      </div>

      {/* Extra Information */}

      <div className="rounded-2xl bg-gray-100 p-5">

        <p>
          <strong>SKU :</strong> {product.sku || "N/A"}
        </p>

        <p className="mt-2">
          <strong>Brand :</strong>{" "}
          {product.brand || "GreenBasket"}
        </p>

        <p className="mt-2">
          <strong>Delivery :</strong> Free Delivery Above ₹499
        </p>

      </div>

    </div>
  );
};

export default ProductInfo;