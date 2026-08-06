import { useMemo } from "react";
import { Plus, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const FrequentlyBought = ({
  products = [],
  onAddAllToCart,
}) => {
  const totalPrice = useMemo(() => {
    return products.reduce(
      (total, product) =>
        total + (product.sellingPrice || 0),
      0
    );
  }, [products]);

  if (!products.length) return null;

  return (
    <section className="space-y-8">

      {/* Heading */}

      <div>

        <h2 className="text-3xl font-bold text-gray-900">
          Frequently Bought Together
        </h2>

        <p className="mt-2 text-gray-500">
          Customers often purchase these products together.
        </p>

      </div>

      {/* Products */}

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

        <div className="flex flex-wrap items-center justify-center gap-6">

          {products.map((product, index) => (

            <div
              key={product._id}
              className="flex items-center"
            >

              <motion.div
                whileHover={{
                  y: -5,
                }}
                className="w-44"
              >

                <div className="overflow-hidden rounded-2xl border border-gray-100">

                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="aspect-square w-full object-contain bg-gray-50 p-4"
                  />

                </div>

                <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-gray-900">

                  {product.name}

                </h3>

                <p className="mt-2 text-lg font-bold text-green-700">

                  ₹{product.sellingPrice}

                </p>

              </motion.div>

              {index !== products.length - 1 && (

                <div className="mx-5 rounded-full bg-green-100 p-3">

                  <Plus
                    size={20}
                    className="text-green-700"
                  />

                </div>

              )}

            </div>

          ))}

        </div>

        {/* Footer */}

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-green-50 p-6 lg:flex-row">

          <div>

            <p className="text-sm text-gray-500">
              Total Price
            </p>

            <h3 className="mt-1 text-3xl font-bold text-green-700">

              ₹{totalPrice}

            </h3>

          </div>

          <button
            onClick={onAddAllToCart}
            className="flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
          >

            <ShoppingCart size={20} />

            Add All To Cart

          </button>

        </div>

      </div>

    </section>
  );
};

export default FrequentlyBought;