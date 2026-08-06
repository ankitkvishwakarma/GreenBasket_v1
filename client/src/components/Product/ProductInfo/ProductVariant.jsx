import { motion } from "framer-motion";
import { Check } from "lucide-react";

const ProductVariant = ({
  product,
  selectedVariant,
  setSelectedVariant,
}) => {
  if (!product) return null;

  const variants =
    product.variants?.length > 0
      ? product.variants
      : [
          {
            _id: product._id,
            label: product.weight || "Default",
            price: product.price,
            stock: product.stock,
          },
        ];

  return (
    <section className="space-y-5">

      <div>

        <h3 className="text-xl font-semibold text-gray-900">
          Select Pack Size
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Choose the pack size that best suits your needs.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {variants.map((variant) => {

          const active =
            selectedVariant?._id === variant._id;

          return (
            <motion.button
              key={variant._id}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                setSelectedVariant(variant)
              }
              className={`
                relative
                overflow-hidden
                rounded-2xl
                border-2
                p-4
                text-left
                transition-all
                duration-300

                ${
                  active
                    ? "border-green-600 bg-green-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-green-400"
                }
              `}
            >

              {active && (

                <div className="absolute right-3 top-3">

                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">

                    <Check size={14} />

                  </div>

                </div>

              )}

              <h4 className="text-lg font-bold text-gray-900">
                {variant.label}
              </h4>

              <p className="mt-2 text-green-700 font-semibold">
                ₹{variant.price}
              </p>

              {variant.stock > 0 ? (
                <p className="mt-2 text-xs text-green-600">
                  In Stock
                </p>
              ) : (
                <p className="mt-2 text-xs text-red-600">
                  Out of Stock
                </p>
              )}

            </motion.button>
          );
        })}

      </div>

    </section>
  );
};

export default ProductVariant;