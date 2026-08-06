import { motion } from "framer-motion";

import ProductHeader from "./ProductHeader";
import ProductPrice from "./ProductPrice";
import ProductVariant from "./ProductVariant";
import ProductQuantity from "./ProductQuantity";
import ProductOffers from "./ProductOffers";
import ProductTrust from "./ProductTrust";

const ProductInfo = ({
  product,
  selectedVariant,
  setSelectedVariant,
  quantity,
  setQuantity,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="space-y-6"
    >
      {/* Product Header */}

      <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">

        <ProductHeader
          product={product}
        />

      </div>

      {/* Price */}

      <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">

        <ProductPrice
          product={product}
          selectedVariant={
            selectedVariant
          }
        />

      </div>

      {/* Variant */}

      <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">

        <ProductVariant
          product={product}
          selectedVariant={
            selectedVariant
          }
          setSelectedVariant={
            setSelectedVariant
          }
        />

      </div>

      {/* Quantity */}

      <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">

        <ProductQuantity
          quantity={quantity}
          setQuantity={setQuantity}
        />

      </div>

      {/* Offers */}

      <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">

        <ProductOffers
          product={product}
        />

      </div>

      {/* Trust */}

      <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">

        <ProductTrust />

      </div>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={onAddToCart}
          className="rounded-2xl border-2 border-green-600 py-4 font-semibold text-green-700 transition-all hover:bg-green-50"
        >
          Add To Cart
        </button>

        <button
          onClick={onBuyNow}
          className="rounded-2xl bg-green-600 py-4 font-semibold text-white transition-all hover:bg-green-700"
        >
          Buy Now
        </button>

      </div>
    </motion.div>
  );
};

export default ProductInfo;