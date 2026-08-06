import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const discount =
    product.discountPercentage ||
    Math.round(
      ((product.mrp - product.sellingPrice) /
        product.mrp) *
        100
    );

  return (
    <div
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Image */}

      <Link
        to={`/product/${product.slug}`}
        className="relative"
      >
        <div className="relative h-40 overflow-hidden bg-gray-50">

          <img
            src={
              product.images?.[0]?.url ||
              "/images/no-image.png"
            }
            alt={product.name}
            className="
              h-full
              w-full
              object-contain
              p-3
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />

          {discount > 0 && (
            <span
              className="
                absolute
                left-2
                top-2
                rounded-full
                bg-red-500
                px-2
                py-1
                text-[10px]
                font-semibold
                text-white
              "
            >
              {discount}% OFF
            </span>
          )}

          {product.isOrganic && (
            <span
              className="
                absolute
                right-2
                top-2
                rounded-full
                bg-green-600
                px-2
                py-1
                text-[10px]
                font-semibold
                text-white
              "
            >
              Organic
            </span>
          )}

        </div>
      </Link>

      {/* Body */}

      <div className="flex flex-1 flex-col p-3">

        <p className="text-[11px] text-gray-500">
          {product.brand}
        </p>

        <Link to={`/product/${product.slug}`}>
          <h3
            className="
              mt-1
              line-clamp-2
              min-h-[42px]
              text-sm
              font-semibold
              text-gray-900
              transition
              group-hover:text-green-600
            "
          >
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">

          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-xs font-medium">
            {product.averageRating?.toFixed(1) || "0.0"}
          </span>

          <span className="text-xs text-gray-500">
            ({product.numReviews || 0})
          </span>

        </div>

        <div className="mt-3 flex items-center gap-2">

          <span className="text-lg font-bold text-green-700">
            ₹{product.sellingPrice}
          </span>

          <span className="text-xs text-gray-400 line-through">
            ₹{product.mrp}
          </span>

        </div>

        <p
          className={`mt-2 text-xs ${
            product.stock > 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} In Stock`
            : "Out of Stock"}
        </p>

        <div className="mt-auto flex gap-2 pt-4">

          <button
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-gray-200
              transition
              hover:bg-gray-100
            "
          >
            <Heart size={16} />
          </button>

          <button
            className="
              flex-1
              rounded-lg
              bg-green-600
              px-3
              py-2.5
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-green-700
            "
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart size={16} />
              Add to Cart
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;