import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  ShoppingCart,
} from "lucide-react";

const RelatedProducts = ({
  products = [],
}) => {
  const navigate = useNavigate();

  if (!products.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-gray-900">

            Related Products

          </h2>

          <p className="mt-2 text-gray-500">

            Similar products you may like.

          </p>

        </div>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-green-600
            px-5
            py-3
            text-white
            transition
            hover:bg-green-700
          "
        >

          View All

          <ArrowRight size={18} />

        </button>

      </div>

      {/* Products */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {products.map((product) => (

          <motion.div
            key={product._id}
            whileHover={{
              y: -6,
            }}
            className="
              overflow-hidden
              rounded-3xl
              border
              border-gray-100
              bg-white
              shadow-sm
              transition
              hover:shadow-xl
            "
          >

            {/* Image */}

            <div
              className="
                relative
                aspect-square
                overflow-hidden
                bg-gray-50
              "
            >

              <img
                src={
                  product.images?.[0]?.url
                }
                alt={product.name}
                className="
                  h-full
                  w-full
                  object-contain
                  transition
                  duration-500
                  hover:scale-110
                "
              />

            </div>

            {/* Body */}

            <div className="space-y-4 p-5">

              <h3 className="line-clamp-2 text-lg font-semibold">

                {product.name}

              </h3>

              <div className="flex items-center gap-2">

                <Star
                  size={16}
                  className="
                    fill-yellow-400
                    text-yellow-400
                  "
                />

                <span>

                  {product.averageRating?.toFixed(
                    1
                  ) || "0.0"}

                </span>

              </div>

              <div className="flex items-center gap-3">

                <span
                  className="
                    text-2xl
                    font-bold
                    text-green-700
                  "
                >

                  ₹{product.sellingPrice}

                </span>

                {product.mrp >
                  product.sellingPrice && (

                  <span
                    className="
                      text-gray-400
                      line-through
                    "
                  >

                    ₹{product.mrp}

                  </span>

                )}

              </div>

              <button
                onClick={() =>
                  navigate(
                    `/product/${product.slug}`
                  )
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-green-600
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-green-700
                "
              >

                <ShoppingCart size={18} />

                View Product

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default RelatedProducts;